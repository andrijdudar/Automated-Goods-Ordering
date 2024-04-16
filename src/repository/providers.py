import os

from dotenv import load_dotenv
from fastapi import status, HTTPException
from sqlalchemy.orm import Session

from src.schemas import OrederIngByProvider, IngredientResponseModel
from src.database.models import  Provider
from src.services.resto_stock_balanse import  IikoAPIHandler
from src.services.telegram_bot import TelegramBot
from src.repository.tags import find_tags



async def get_providers(db: Session):
    providers = db.query(Provider).all()
    return providers


async def delete_provider(id: int, db: Session):
    provider = db.query(Provider).filter(Provider.id == id).first()
    db.delete(provider)
    db.commit()
    return {"message": "provider successfully deleted"}