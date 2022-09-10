from pydantic import BaseModel, EmailStr

from app.schemas import Item


class UserBase(BaseModel):
    email: EmailStr | None
    is_active: bool | None = True
    is_superuser: bool = False
    full_name: str | None = None


class UserCreate(UserBase):
    email: EmailStr
    password: str


class UserUpdate(UserBase):
    password: str | None = None


class UserInDBBase(UserBase):
    id: int | None = None

    class Config:
        orm_mode = True


class User(UserInDBBase):
    """
    apiで返すためのモデル
    passwordやhashed_passwordはセキュリティーのため扱わない
    """
    items: list[Item] = []


class UserInDB(UserInDBBase):
    hashed_password: str
