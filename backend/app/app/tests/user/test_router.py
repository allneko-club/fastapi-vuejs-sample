from unittest.mock import patch
from typing import Dict

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.utils import random_email, random_lower_string
from app.user.cruds import crud_user
from app.user.models import User
from app.user.schemas import UserCreateSchema

# -------------
# /users/
# -------------


def test_retrieve_users(client: TestClient, superuser_token_headers: dict, db: Session):
    username = random_email()
    password = random_lower_string()
    user_in = UserCreateSchema(email=username, password=password)
    crud_user.create(db, user_in)

    username2 = random_email()
    password2 = random_lower_string()
    user_in2 = UserCreateSchema(email=username2, password=password2)
    crud_user.create(db, user_in2)

    r = client.get(f"{settings.API_V1_STR}/users/", headers=superuser_token_headers)
    all_users = r.json()

    assert len(all_users) > 1
    for item in all_users:
        assert "email" in item


def test_create_user_new_email(client: TestClient, superuser_token_headers: dict, db: Session):
    username = random_email()
    password = random_lower_string()
    is_active = False
    is_superuser = True
    data = {
        "email": username,
        "password": password,
        'is_active': is_active,
        'is_superuser': is_superuser,
    }
    r = client.post(
        f"{settings.API_V1_STR}/users/", headers=superuser_token_headers, json=data,
    )
    assert 200 <= r.status_code < 300
    created_user = r.json()
    user = crud_user.get_by_email(db, email=username)
    assert user
    assert user.email == created_user["email"]
    assert user.is_active == created_user["is_active"] == is_active
    assert user.is_superuser == created_user["is_superuser"] == is_superuser


def test_create_user_existing_username(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:
    username = random_email()
    # username = email
    password = random_lower_string()
    user_in = UserCreateSchema(email=username, password=password)
    crud_user.create(db, user_in)
    data = {"email": username, "password": password}
    r = client.post(
        f"{settings.API_V1_STR}/users/", headers=superuser_token_headers, json=data,
    )
    created_user = r.json()
    assert r.status_code == 400
    assert "_id" not in created_user


def test_create_user_by_normal_user(client: TestClient, normal_user_token_headers: Dict[str, str]):
    username = random_email()
    password = random_lower_string()
    data = {"email": username, "password": password}
    r = client.post(
        f"{settings.API_V1_STR}/users/", headers=normal_user_token_headers, json=data,
    )
    assert r.status_code == 400


# -------------
# /users/me
# -------------

def test_get_users_superuser_me(client: TestClient, superuser_token_headers: Dict[str, str]):
    r = client.get(f"{settings.API_V1_STR}/users/me", headers=superuser_token_headers)
    current_user = r.json()
    assert current_user
    assert current_user["is_active"] is True
    assert current_user["is_superuser"]
    assert current_user["email"] == settings.FIRST_SUPERUSER


def test_get_users_normal_user_me(client: TestClient, normal_user_token_headers: Dict[str, str]):
    r = client.get(f"{settings.API_V1_STR}/users/me", headers=normal_user_token_headers)
    current_user = r.json()
    assert current_user
    assert current_user["is_active"] is True
    assert current_user["is_superuser"] is False
    assert current_user["email"] == settings.EMAIL_TEST_USER


def test_update_user_me(client: TestClient, normal_user_token_headers: Dict[str, str]):
    password = random_lower_string()
    full_name = 'full name'
    data = {"password": password, "full_name": full_name}

    r = client.put(f"{settings.API_V1_STR}/users/me", headers=normal_user_token_headers, json=data)
    current_user = r.json()
    assert current_user
    assert current_user["full_name"] == full_name


# -------------
# /open
# -------------
@patch('app.user.routers.settings')
def test_create_user_open(mock, client: TestClient, db: Session):
    mock.USERS_OPEN_REGISTRATION = True
    username = random_email()
    password = random_lower_string()
    data = {"email": username, 'password': password}

    r = client.post(f'{settings.API_V1_STR}/users/open', json=data)
    assert 200 == r.status_code
    created_user = r.json()
    user = crud_user.get_by_email(db, email=username)
    assert user
    assert user.email == created_user["email"]
    assert user.full_name is None


@patch('app.user.routers.settings')
def test_create_user_open_not_allowed(mock, client: TestClient):
    mock.USERS_OPEN_REGISTRATION = False
    data = {'email': random_email(), 'password': 'password', 'full_name': 'Full Name'}
    r = client.post(f'{settings.API_V1_STR}/users/open', json=data)
    assert 403 == r.status_code


# -------------
# /users/{user_id}
# -------------

def test_read_user_by_id_if_superuser(client: TestClient, superuser_token_headers: dict, db: Session):
    username = random_email()
    password = random_lower_string()
    user_in = UserCreateSchema(email=username, password=password)
    user = crud_user.create(db, user_in)
    user_id = user.id
    r = client.get(
        f"{settings.API_V1_STR}/users/{user_id}", headers=superuser_token_headers,
    )
    assert 200 <= r.status_code < 300
    api_user = r.json()
    existing_user = crud_user.get_by_email(db, email=username)
    assert existing_user
    assert existing_user.id == api_user["id"]


def test_read_user_by_id_if_normal_user_read_others(client: TestClient, normal_user_token_headers: dict, db: Session):
    username = random_email()
    password = random_lower_string()
    user_in = UserCreateSchema(email=username, password=password)
    user = crud_user.create(db, user_in)
    user_id = user.id
    r = client.get(
        f"{settings.API_V1_STR}/users/{user_id}", headers=normal_user_token_headers,
    )
    assert r.status_code == 400


def test_update_user(client: TestClient, superuser_token_headers: dict, db: Session):
    username = random_email()
    password = random_lower_string()
    user_in = UserCreateSchema(email=username, password=password)
    user = crud_user.create(db, user_in)
    user_id = user.id
    r = client.get(
        f"{settings.API_V1_STR}/users/{user_id}", headers=superuser_token_headers,
    )
    assert 200 <= r.status_code < 300
    api_user = r.json()
    existing_user = crud_user.get_by_email(db, email=username)
    assert existing_user
    assert existing_user.id == api_user["id"]


def test_update_user_by_normal_user(
    client: TestClient, normal_user_token_headers: dict, db: Session
):
    user = db.query(User).first()
    data = {'full_name': 'Full Name'}
    r = client.post(
        f"{settings.API_V1_STR}/users/{user.id}", headers=normal_user_token_headers, json=data,
    )
    assert r.status_code == 405
