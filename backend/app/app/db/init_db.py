from sqlalchemy.orm import Session

from app.user.cruds import crud_user
from app.core.config import settings
from app.db import base  # noqa: F401
from app.user.schemas import UserCreateSchema

def init_db(db: Session) -> None:
    user = crud_user.get_by_email(db, email=settings.FIRST_SUPERUSER)
    if not user:
        user_in = UserCreateSchema(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
        )
        user = crud_user.create(db, user_in)  # noqa: F841
