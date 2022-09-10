from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.routers.dependencies import get_db, get_current_active_user

router = APIRouter()


@router.get("/", response_model=list[schemas.Item])
def read_items(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user),
):
    """
    Retrieve items.
    """
    if crud.user.is_superuser(current_user):
        items = crud.item.get_multi(db, skip=skip, limit=limit)
    else:
        items = crud.item.get_multi_by_owner(
            db, owner_id=current_user.id, skip=skip, limit=limit
        )
    return items


@router.post("/", response_model=schemas.Item)
def create_item(
    item_in: schemas.ItemCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user),
):
    """
    Create new item.
    """
    item = crud.item.create_with_owner(db, obj_in=item_in, owner_id=current_user.id)
    return item


@router.get("/{id}", response_model=schemas.Item)
def read_item(
    id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user),
) -> Any:
    """
    Get item by ID.
    """
    item = crud.item.get(db, id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    if not crud.user.is_superuser(current_user) and (item.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return item


@router.put("/{id}", response_model=schemas.Item)
def update_item(
    id: int,
    item_in: schemas.ItemUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user),
):
    """
    Update an item.
    """
    item = crud.item.get(db, id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    if not crud.user.is_superuser(current_user) and (item.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    item = crud.item.update(db, db_obj=item, obj_in=item_in)
    return item


@router.delete("/{id}", response_model=schemas.Item)
def delete_item(
    id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user),
):
    """
    Delete an item.
    """
    item = crud.item.get(db, id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    if not crud.user.is_superuser(current_user) and (item.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    item = crud.item.remove(db, id)
    return item
