from pydantic import BaseModel


class ItemBase(BaseModel):
    title: str | None = None
    description: str | None = None


class ItemCreate(ItemBase):
    title: str


class ItemUpdate(ItemBase):
    pass


class ItemInDBBase(ItemBase):
    id: int
    title: str
    owner_id: int

    class Config:
        orm_mode = True


class Item(ItemInDBBase):
    pass


class ItemInDB(ItemInDBBase):
    pass
