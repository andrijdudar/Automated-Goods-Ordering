import json
import uvicorn
import ngrok
import os
import requests

from dotenv import load_dotenv
from icecream import ic
from aiohttp import ClientSession
from aiohttp import ClientSession
from fastapi import FastAPI, Request, APIRouter
from sqlalchemy.orm import Session


from src.schemas import BotUpdateModel, FromTG, BotMessage
from src.database.models import Dish, User


load_dotenv()


class TelegramBot:

    TG_API = os.getenv("BOT_TOKEN")
    SEND_MESSAGE_URL = os.getenv("SEND_MESSAGE_URL")
    SEND_PHOTO_URL = os.getenv("SEND_PHOTO_URL")

    async def send_start_message(self, request):
        name_of_buttons = ['зареєструватись як user', 'зареєструватись як admin']
        data = await self.make_bot_buttons(name_of_buttons, request)
        return await self.send_bot_message(data)


    async def send_bot_message(self, data: dict):
        async with ClientSession() as session:
            async with session.post(self.SEND_MESSAGE_URL, data=data) as response:
                result = {'message': 'ok'}
            return result


    async def send_image(self, url, chat_id):
        data = {
            'chat_id': chat_id,
            'photo': url
        }
        async with ClientSession() as session:
            async with session.post(self.SEND_PHOTO_URL, data=data) as response:
                result = {'message': 'send'}


    async def send_home(self, request: BotUpdateModel)-> None:
        chat_id = request.message.from_tg.chat_id
        text = 'home'
        buttons = [['home']]
        reply_keyboard_marckup = {'keyboard': buttons}
        reply_keyboard_marckup_json = json.dumps(reply_keyboard_marckup)
        data = {
            'chat_id': chat_id,
            'text': '_',
            "reply_markup": reply_keyboard_marckup_json}
        return await self.send_bot_message(data)
    

    async def make_bot_buttons(self, name_of_buttons: list, request: BotUpdateModel):
        chat_id = request.message.from_tg.chat_id
        text = request.message.text
        buttons = []
        for name in name_of_buttons:
            n = []
            n.append(name)
            buttons.append(n)
        buttons.append(['home'])
        reply_keyboard_marckup = {'keyboard': buttons}
        reply_keyboard_marckup_json = json.dumps(reply_keyboard_marckup)
        data = {
            'chat_id': chat_id,
            'text': text,
            "reply_markup": reply_keyboard_marckup_json}
        return data
    

    async def create_new_admin(request: BotUpdateModel, db: Session) -> User:
        user = User(username=request.message.from_tg.username, 
                            first_name=request.message.from_tg.first_name,
                            last_name=request.message.from_tg.last_name,
                            chat_id=request.message.from_tg.chat_id,
                            email='',
                            password='',
                            bot_role='admin')
        db.add(user)
        db.commit()
        return user
    
    

    # async def send_dish_info(self, dish_id, name: str, description:str | None, ingredients: str, photo_url: str, price: int, chat_id):
    #     if not description:
    #         description = ''
    #     if not price:
    #         price = ''
    #     ing = ''
    #     for i in ingredients.split(', '):
    #         ing += i + '\n'
    #     text = f'id:\n{dish_id}\n\nназва:\n{name}\n\nопис:\n{description}\n\nкалькуляція:\n{ing}\n\nціна:\n{price}\n'
    #     ic(text)
    #     data = {
    #         'chat_id': chat_id,
    #         'text': text
    #     }
    #     if photo_url:
    #         await self.send_image(photo_url, chat_id)
    #     await self.send_bot_message(data)


    async def send_dish_info(self, dish: Dish, chat_id: int) -> dict:
        description = dish.description
        if not description:
            description = ''
        price = dish.price
        if not price:
            price = ''
        ing = ''
        for i in dish.ingredients.split(', '):
            ing += i + '\n'
        text = f'id:\n{dish.id}\n\nназва:\n{dish.dish_name}\n\nопис:\n{description}\n\nкалькуляція:\n{ing}\n\nціна:\n{price}\n'
        data = {
            'chat_id': chat_id,
            'text': text
        }
        if dish.image_url:
            await self.send_image(dish.image_url, chat_id)
        return await self.send_bot_message(data)


    async def send_message(self, request: BotUpdateModel, message: str):
        data = {
            'chat_id': request.message.from_tg.chat_id,
            'text': message
        }
        await self.send_bot_message(data)
        
