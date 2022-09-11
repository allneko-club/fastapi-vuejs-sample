from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.utils import random_email, random_lower_string
from app.user.cruds import crud_user
from app.user.schemas import UserCreateSchema, UserUpdateSchema


def user_authentication_headers(client: TestClient, email: str, password: str):
    data = {"username": email, "password": password}
    r = client.post(f"{settings.API_V1_STR}/login/access-token", data=data)
    response = r.json()
    auth_token = response["access_token"]
    headers = {"Authorization": f"Bearer {auth_token}"}
    return headers


def create_random_user(db: Session):
    email = random_email()
    password = random_lower_string()
    user_in = UserCreateSchema(username=email, email=email, password=password)
    user = crud_user.create(db, user_in)
    return user


def authentication_token_from_email(client: TestClient, email: str, db: Session):
    """
    Return a valid token for the user with given email.

    If the user doesn't exist it is created first.
    """
    password = random_lower_string()
    user = crud_user.get_by_email(db, email=email)
    if not user:
        user_in_create = UserCreateSchema(username=email, email=email, password=password)
        user = crud_user.create(db, user_in_create)
    else:
        user_in_update = UserUpdateSchema(password=password)
        user = crud_user.update(db, user, user_in_update)

    return user_authentication_headers(client=client, email=email, password=password)