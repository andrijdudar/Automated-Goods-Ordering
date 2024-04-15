
from fastapi import HTTPException,APIRouter, Depends, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from PIL import Image

from src.schemas import ProviderResponse
from src.database.db_connection import get_db
from src.database.models import Dish, Category
from src.repository import providers as prov
from src.services.images import image_cloudinary, resize_image

router = APIRouter(prefix="/providers", tags=["providers"])



@router.get("/", response_model=list[ProviderResponse])
async def get_providers(db: Session = Depends(get_db)):
    providers = await prov.get_providers(db)
    if not providers:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                             detail="Providers not found")
    return providers



@router.delete("/delete/{id}")
async def delete_provider(id: int, db: Session=Depends(get_db)):
    return await providers.delete_provider(id, db)