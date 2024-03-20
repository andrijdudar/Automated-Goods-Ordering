from fastapi import status, HTTPException
from sqlalchemy.orm import Session


from src.schemas import PremixModel, PremixResponseModel
from src.database.models import Dish, Tag, Category, User, Ingredient,Premix
from src.services.images import image_cloudinary
from src.repository.tags import find_tags


async def get_all_premixes(db: Session) -> list[Premix]:
    pass


async def get_premix(id: int, db: Session) -> Premix:
    pass


async def create_premix(body: PremixModel, db: Session) -> Premix:
    pass