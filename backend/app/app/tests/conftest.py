from typing import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy import create_engine

from app.core.dependencies import get_db
from app.core.config import settings
from app.core.db.database import Base
from app.main import app
from app.tests.user.utils import authentication_token_from_email
from app.tests.utils.utils import get_superuser_token_headers
from app.initial_data import init_db

Session = scoped_session(sessionmaker())
engine = create_engine('sqlite:///./test.db', connect_args={"check_same_thread": False})
Session.configure(bind=engine)
Base.metadata.create_all(bind=engine)


def override_get_db():
    try:
        db = Session()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(scope="session")
def db() -> Generator:
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = Session()
    init_db(db)

    yield db

    db.rollback()
    Session.remove()


@pytest.fixture(scope="module")
def client() -> Generator:
    with TestClient(app) as c:
        yield c


@pytest.fixture(scope="module")
def superuser_token_headers(client: TestClient) -> dict[str, str]:
    return get_superuser_token_headers(client)


@pytest.fixture(scope="module")
def normal_user_token_headers(client: TestClient, db: Session) -> dict[str, str]:
    return authentication_token_from_email(client, settings.EMAIL_TEST_USER, db)
