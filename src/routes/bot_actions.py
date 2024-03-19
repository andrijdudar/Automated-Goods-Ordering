import json
import uvicorn
import ngrok
import os

from icecream import ic
from dotenv import load_dotenv

from aiohttp import ClientSession
from sqlalchemy.orm import Session
from fastapi import FastAPI, Request, APIRouter, Depends, HTTPException, status
from aiogram import Bot, Dispatcher

from aiogram.types import KeyboardButton, ReplyKeyboardMarkup

from src.database.db_connection import get_db
from src.schemas import BotUpdateModel, OkResponseModel
from src.repository import bot_contents
from src.bot_request_handler.bot_request_handler import bot_request_handler_chain
from src.services.bot_exceptions import bot_exceptions

router = APIRouter(prefix='/bot_actions')

load_dotenv()
TG_API = os.getenv("BOT_TOKEN")


@router.post('/webhook', response_model=OkResponseModel)
async def root(obj: BotUpdateModel, db: Session = Depends(get_db)):
    bot_handler_chain = await bot_request_handler_chain()
    response = await bot_handler_chain.handle_request(obj, db)
    ic(response)
    return {'message': 'ok'}
    


