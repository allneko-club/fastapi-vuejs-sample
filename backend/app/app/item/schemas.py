from pydantic import BaseModel


class ItemBase(BaseModel):
    title: str | None = None
    description: str | None = None


class ItemCreateSchema(ItemBase):
    title: str


class ItemUpdateSchema(ItemBase):
    pass


class ItemInDBSchemaBase(ItemBase):
    id: int
    title: str
    owner_id: int

    class Config:
        orm_mode = True


class ItemSchema(ItemInDBSchemaBase):
    pass


class ItemInDBSchema(ItemInDBSchemaBase):
    pass
