import os

from dotenv import load_dotenv
from fastapi import status, HTTPException
from sqlalchemy.orm import Session

from src.schemas import OrederIngByProvider
from src.database.models import Dish, Tag, Category, User, Ingredient, Provider
from src.services.resto_stock_balanse import  IikoAPIHandler
from src.services.telegram_bot import TelegramBot
from src.repository.tags import find_tags



load_dotenv()


TG_API = os.getenv("BOT_TOKEN")
SEND_MESSAGE_URL = os.getenv("SEND_MESSAGE_URL")
SEND_PHOTO_URL = os.getenv("SEND_PHOTO_URL")

telegram_bot = TelegramBot(TG_API, SEND_MESSAGE_URL, SEND_PHOTO_URL)


async def get_all_ingredients(db: Session) -> list[Ingredient]:
    pass


async def get_ingredient(id: int, db: Session) -> Ingredient:
    pass


async def update_ingerdients(data: list[dict], db: Session):
    for obj in data:
        ingredient = db.query(Ingredient).filter(Ingredient.product_id == obj.get("product")).first()
        if ingredient:
            ingredient.name = obj.get("name")
            ingredient.amount = obj.get("amount")
            ingredient.suma = obj.get("sum")
            db.commit()
            continue
        else:
            new_ingredient = Ingredient(
                name = obj.get("name"),
                product_id = obj.get("product"),
                amount = obj.get("amount"),
                suma = obj.get("sum"),
                    )
            db.commit()


async def calculate_order(standart_container: float, stock_maximum: float, amount: float) -> int:
    return round((stock_maximum - amount)/standart_container)


async def get_order(db: Session) -> list[Ingredient]:
    iiko_server = IikoAPIHandler()
    storage_balance = iiko_server.get_storage_balance()
    await update_ingerdients(storage_balance, db)
    prov_with_ing_list = []
    providers = db.query(Provider).all()
    for provider in providers:
        provider_with_ingredients = {}
        ingredients = db.query(Ingredient).filter(
            Ingredient.provider_id == provider.id,
            Ingredient.amount < Ingredient.stock_minimum
        ).all()
        if ingredients:
            value = []
            for ingredient in ingredients:
                ing = {}
                ing["id"] = ingredient.id
                ing["name"] = ingredient.name
                ing["order"] = calculate_order(ingredient.standart_container, ingredient.stock_maximum, ingredient.amount)
                value.append(ing)
            provider_with_ingredients["id"] = provider.id
            provider_with_ingredients["name"] = provider.provider_name
            provider_with_ingredients['order'] = value
        prov_with_ing_list.append(provider_with_ingredients)
    return prov_with_ing_list


async def send_order_to_provider(body: list[OrederIngByProvider], db: Session):
    for char in body:
        provider = db.query(Provider).filter(Provider.id == char.id).first()
        name = provider.salesman_name
        chat_id = provider.chat_id
        message = f"Добрий день, {name}\n"
        for ing in char.order:
            ing_name = ing.name
            ing_order = ing.order
            msg = f"{ing_name} - {ing_order}/n"
            message += msg
        data = {
            "chat_id": chat_id,
            "text": message
        }
        await telegram_bot.send_bot_message(data)
    return {"Message": "The order has been sent successfully"}
