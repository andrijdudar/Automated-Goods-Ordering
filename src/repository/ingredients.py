from fastapi import status, HTTPException
from sqlalchemy.orm import Session


from src.schemas import DishModel, UpdateDishModel
from src.database.models import Dish, Tag, Category, User, Ingredient
from src.services.images import image_cloudinary
from src.repository.tags import find_tags


async def get_all_ingredients(db: Session) -> list[Ingredient]:
    pass


async def get_ingredient(id: int, db: Session) -> Ingredient:
    pass


async def get_storege_balans(db) -> list[Ingredient]:
    pass