from dotenv import load_dotenv

from aiohttp import ClientSession
from fastapi import FastAPI, Request, APIRouter, Depends, status
from sqlalchemy.orm import Session

from src.schemas import  OkResponseModel

from src.database.db_connection import get_db
from src.repository import fillers

router = APIRouter(prefix='/fillers')

@router.get('/categories/{number}', response_model= OkResponseModel)
async def fill_categorias_to_base(id: int, db: Session = Depends(get_db)):
    await fillers.fill_categorias_to_base(db)
    return {'message': 'ok'}

@router.get('/dishes/{number}', response_model=OkResponseModel)
async def fill_restorant_menu_to_base(number: int, db: Session = Depends(get_db)):
    return await fillers.fill_restorant_menu_to_base(db)

@router.delete('/', response_model=OkResponseModel)
async def clean_data(db: Session = Depends(get_db)):
    return await fillers.clean_data(db)