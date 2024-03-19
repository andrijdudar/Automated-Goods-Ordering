from dotenv import load_dotenv

from aiohttp import ClientSession
from fastapi import FastAPI, Request, APIRouter, Depends, status
from sqlalchemy.orm import Session

from src.schemas import  OkResponseModel

from src.database.db_connection import get_db
from src.repository import fillers
from src.database.models import User

router = APIRouter(prefix='/users')



@router.delete('/delete', response_model=OkResponseModel)
async def del_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    for user in users:
        db.delete(user)
        db.commit()

    return {'message': 'ok'}