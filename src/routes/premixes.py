import uuid
import io

from fastapi import HTTPException,APIRouter, Depends, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from PIL import Image

from src.schemas import PremixModel,PremixResponseModel
from src.database.db_connection import get_db
from src.database.models import Dish, Category
from src.repository import dishes, premixes
from src.services.images import image_cloudinary, resize_image


router = APIRouter(prefix='/premixes')



@router.get("/", response_model=list[PremixResponseModel])
async def get_all_premixes(db: Session = Depends(get_db)):
    premixes_list = await premixes.get_all_premixes(db)
    if premixes_list is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Premixes not found"
        )
    return premixes_list


@router.get("/{premix_id}", response_model=PremixResponseModel)
async def get_premix(ingredient_id: int, db: Session = Depends(get_db)):
    premix = await premixes.get_premix(ingredient_id, db)
    if premix is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Premix not found"
        )
    return premix


@router.post("/create_premix", response_model=PremixResponseModel)
async def create_premix(body: PremixModel, db: Session = Depends(get_db)):
    premix = await premixes.create_premix(body, db)
    if premix is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Premix not found"
        )
    return premix
