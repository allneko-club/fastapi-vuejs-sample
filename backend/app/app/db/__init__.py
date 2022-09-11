# Import all the models, so that Base has them before being
# imported by Alembic
from .database import Base  # noqa
from app.item.models import Item  # noqa
from app.user.models import User  # noqa
