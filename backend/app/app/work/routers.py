from fastapi import APIRouter, Depends

from app.core.schemas import MsgSchema
from app.celery import celery_app
from app.user.dependencies import get_current_active_superuser
from app.user.models import User

router = APIRouter()


@router.post("/test-celery/", response_model=MsgSchema, status_code=201)
def test_celery(
    msg: MsgSchema,
    current_user: User = Depends(get_current_active_superuser),
):
    """
    Test Celery worker.
    """
    celery_app.send_task("app.tasks.test_celery", args=[msg.msg])
    return {"msg": "Word received"}
