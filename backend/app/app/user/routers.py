from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic.networks import EmailStr
from sqlalchemy.orm import Session

from app.routers.dependencies import get_db, get_current_active_user, get_current_active_superuser
from app.core.config import settings
from app.user.cruds import crud_user
from app.utils import send_new_account_email
from app.user.models import User
from app.user.schemas import UserSchema, UserCreateSchema, UserUpdateSchema

router = APIRouter()


@router.get("/", response_model=list[UserSchema])
def read_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_superuser),
):
    users = crud_user.get_multi(db, skip=skip, limit=limit)
    return users


@router.post("/", response_model=UserSchema)
def create_user(
    user_in: UserCreateSchema,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_superuser),
):
    """スーパーユーザーのみがユーザーを作成できる"""
    db_user = crud_user.get_by_email(db, email=user_in.email)
    if db_user:
        raise HTTPException(status_code=400, detail="already registered.")
    db_user = crud_user.create(db, user_in)

    if settings.EMAILS_ENABLED and user_in.email:
        send_new_account_email(
            email_to=user_in.email, username=user_in.email, password=user_in.password
        )
    return db_user


@router.get("/me", response_model=UserSchema)
def read_user_me(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    return current_user


@router.put("/me", response_model=UserSchema)
def update_user_me(
    email: EmailStr = Body(None),
    password: str = Body(None),
    full_name: str = Body(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    Update own user.
    """
    stored_data = jsonable_encoder(current_user)
    user_in = UserUpdateSchema(**stored_data)
    if password is not None:
        user_in.password = password
    if full_name is not None:
        user_in.full_name = full_name
    if email is not None:
        user_in.email = email
    user = crud_user.update(db, db_obj=current_user, obj_in=user_in)
    return user


@router.post("/open", response_model=UserSchema)
def create_user_open(
    password: str = Body(),
    email: EmailStr = Body(),
    full_name: str = Body(None),
    db: Session = Depends(get_db),
):
    """
    Create new user without the need to be logged in.
    """
    if not settings.USERS_OPEN_REGISTRATION:
        raise HTTPException(
            status_code=403,
            detail="Open user registration is forbidden on this server",
        )
    db_user = crud_user.get_by_email(db, email=email)
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system",
        )
    user_in = UserCreateSchema(password=password, email=email, full_name=full_name)
    user = crud_user.create(db, user_in)
    return user


@router.get("/{user_id}", response_model=UserSchema)
def read_user_by_id(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    user = crud_user.get(db, id=user_id)
    if user == current_user:
        return user
    if not crud_user.is_superuser(current_user):
        raise HTTPException(
            status_code=400, detail="The user doesn't have enough privileges"
        )
    return user


@router.put("/{user_id}", response_model=UserSchema)
def update_user(
    user_id: int,
    user_in: UserUpdateSchema,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_superuser),
):
    user = crud_user.get(db, id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user = crud_user.update(db, db_obj=user, obj_in=user_in)
    return user
