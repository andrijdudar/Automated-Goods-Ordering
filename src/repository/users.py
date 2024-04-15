import os

from dotenv import load_dotenv
from fastapi import status, HTTPException
from sqlalchemy.orm import Session

from src.schemas import UsersResponseModel
from src.database.models import  User
from src.services.resto_stock_balanse import  IikoAPIHandler
from src.services.telegram_bot import TelegramBot
from src.repository.tags import find_tags


async def get_user(id: int, db: Session):
    return db.query(User).filter(User.id == id).first()


async def get_users(db: Session):
    return db.query(User).all()


async def patch_user(body: UsersResponseModel, db: Session):
    user = db.query(User).filter(User.id == body.id).first()
    if body.first_name:
        user.first_name = body.first_name
    if body.last_name:
        user.last_name = body.last_name
    if body.email:
        user.email = body.email
    if body.information:
        user.information = body.information
    db.commit()
    return user



async def delete_user(id: int, db: Session):
    user = db.query(User).filter(User.id == id).first()
    db.delete(user)
    db.commit()
    return {"message": "OK"}