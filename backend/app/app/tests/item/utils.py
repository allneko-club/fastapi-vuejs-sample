from sqlalchemy.orm import Session

from app.item.cruds import crud_item
from app.item.schemas import ItemCreateSchema
from app.item.models import Item
from app.tests.user.utils import create_random_user
from app.tests.utils.utils import random_lower_string


def create_random_item(db: Session, owner_id: int | None = None) -> Item:
    if owner_id is None:
        user = create_random_user(db)
        owner_id = user.id
    title = random_lower_string()
    description = random_lower_string()
    item_in = ItemCreateSchema(title=title, description=description, id=id)
    return crud_item.create_with_owner(db=db, obj_in=item_in, owner_id=owner_id)
