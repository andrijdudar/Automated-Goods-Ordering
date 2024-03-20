import uuid
import io

from fastapi import HTTPException,APIRouter, Depends, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from PIL import Image

from src.schemas import IngredientModel, IngredientResponseModel
from src.database.db_connection import get_db
from src.database.models import Dish, Category
from src.repository import dishes, ingredients
from src.services.images import image_cloudinary, resize_image


router = APIRouter(prefix='/ingredients')



@router.get("/", response_model=list[IngredientResponseModel])
async def get_all_ingredients(db: Session = Depends(get_db)):
    ingredients_list = await ingredients.get_all_ingredients(db)
    if ingredients_list is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Ingredients not found"
        )
    return ingredients_list


@router.get("/{ingredient_id}", response_model=IngredientResponseModel)
async def get_ingredient(ingredient_id: int, db: Session = Depends(get_db)):
    ingredient = await ingredients.get_ingredient(ingredient_id, db)
    if ingredient is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Ingredient not found"
        )
    return ingredient


@router.get("/storege_balans", response_model=list[IngredientResponseModel])
async def get_storege_balans(db: Session = Depends(get_db)):
    ingredients_list = await ingredients.get_storege_balans(db)
    if ingredients_list is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Ingredients not found"
        )
    return ingredients_list