from pydantic import BaseModel, EmailStr

from app.item.schemas import ItemSchema


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
    items: list[ItemSchema] = []


class UserInDB(UserInDBBase):
    hashed_password: str
