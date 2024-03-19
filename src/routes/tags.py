import uuid
import io

from fastapi import HTTPException,APIRouter, Depends, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from PIL import Image

from src.schemas import TagResponseModel, OkResponseModel
from src.database.db_connection import get_db
from src.database.models import Dish, Category, Tag
from src.repository import dishes, bot_contents, tags
from src.services.images import image_cloudinary, resize_image
import src


router = APIRouter(prefix='/tags')


@router.get("/", response_model=list[TagResponseModel], status_code=status.HTTP_200_OK)
async def get_tags(db: Session = Depends(get_db)):
    tags_list = await tags.get_tags(db)
    if not tags_list:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Tags not found")
    return tags_list


@router.delete("/delete/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_tag(id: int, db: Session = Depends(get_db)):
    return tags.delete_tag(id, db)


@router.delete("/delete_all", status_code=status.HTTP_204_NO_CONTENT)
async def delete_tags(db: Session = Depends(get_db)):
    return tags.delete_tags(db)

