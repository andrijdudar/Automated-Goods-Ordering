import os

from dotenv import load_dotenv
from icecream import ic
from abc import ABC, abstractmethod
from fastapi import Depends
from sqlalchemy.orm import  Session

from src.schemas import BotMessage, BotUpdateModel
from src.database.models import Dish, Category, User, Role
from src.database.db_connection import get_db
from src.repository import bot_contents
from src.services.chat_gpt import Gpt


load_dotenv()
admin_secret = os.getenv('ADMIN_SECRET')

class AbstractHandler(ABC):
    """
    Abstract base class for handling requests in a chain of responsibility.

    Methods:
    - set_next(handler): Sets the next handler in the chain.
    - handle_request(request, db): Abstract method to handle a request.

    Attributes:
    - _next_handler: The next handler in the chain.
    """
    
    def set_next(self, handler):
        """
        Sets the next handler in the chain.

        Args:
        - handler: The next handler to be set in the chain.
        """ 
        self._next_handler = handler

    @abstractmethod
    def handle_request(self, request, db):
        """
        Abstract method to handle a request.

        Args:
        - request: The request object to be processed.
        - db: The database session or connection.

        Raises:
        - NotImplementedError: If the method is not implemented in a concrete subclass.
        """
        pass


class StartHandler(AbstractHandler):
    async def handle_request(self, request: BotUpdateModel, db: Session):
        if request.message.text == '/start':
            return await bot_contents.bot_start(request, db)
        elif hasattr(self, "_next_handler"):
            await self._next_handler.handle_request(request, db)


class UserRegistrationHandler(AbstractHandler):
    async def handle_request(self, request: BotUpdateModel, db: Session):
        if request.message.text == 'зареєструватись як user':
            return await bot_contents.create_new_user(request, db)
        elif hasattr(self, "_next_handler"):
            await self._next_handler.handle_request(request, db)


class SecretCheckHandler(AbstractHandler):
    async def handle_request(self, request: BotUpdateModel, db: Session):
        if request.message.text == 'зареєструватись як admin':
            return await bot_contents.send_message(request, 'введіть пароль')
        elif hasattr(self, "_next_handler"):
            await self._next_handler.handle_request(request, db)


class AdminRegistrationHandler(AbstractHandler):
    async def handle_request(self, request: BotUpdateModel, db: Session):
        if request.message.text == admin_secret:
            return await bot_contents.admin_registration(request, db)
        elif hasattr(self, "_next_handler"):
            await self._next_handler.handle_request(request, db)


class StopListHandler(AbstractHandler):
    async def handle_request(self, request: BotUpdateModel, db: Session):
        if request.message.text == "стоп-лист":
            return await bot_contents.stop_list(request, db)
        elif hasattr(self, "_next_handler"):
            await self._next_handler.handle_request(request, db)


class CategoriesHandler(AbstractHandler):
    async def handle_request(self, request: BotUpdateModel, db: Session = Depends(get_db)):
        category = await bot_contents.get_category(request, db)
        if category:
            return await bot_contents.send_category_child(category,request, db)
        elif category == None or hasattr(self, "next_handler"):
            await self._next_handler.handle_request(request, db)


class DishesHandler(AbstractHandler):
    async def handle_request(self, request: BotUpdateModel, db: Session = Depends(get_db)):
        dish = await bot_contents.get_dish(request, db)
        if dish:
            user = await bot_contents.get_current_user(request, db)
            bot_role = user.bot_role
            await bot_contents.send_dish_info(dish, request.message.from_tg.chat_id)
            if bot_role == 'admin':
                return await bot_contents.send_admin_functional(dish.dish_name, request)
            return {'message': 'ok'}
        elif dish == None or hasattr(self, "next_handler"):
            await self._next_handler.handle_request(request, db)


class DelDishHandler(AbstractHandler):
    async def handle_request(self, request: BotUpdateModel, db: Session = Depends(get_db)):
        if request.message.text.startswith('видалити позицію'):
            dish_name = request.message.text.removeprefix('видалити позицію').strip()
            return await bot_contents.del_dish(dish_name, request, db)
        elif not request.message.text.startswith('видалити позицію') or hasattr(self, "next_handler"):
            await self._next_handler.handle_request(request, db)


class AddDishToStopListHandler(AbstractHandler):
    async def handle_request(self, request: BotUpdateModel, db: Session = Depends(get_db)):
        if 'додати' in request.message.text:
            return await bot_contents.add_dish_to_stoplist(request, db)
        elif not 'додати' in request.message.text or hasattr(self, "next_handler"):
            await self._next_handler.handle_request(request, db)


class DelDishFromStopListHandler(AbstractHandler):
    async def handle_request(self, request: BotUpdateModel, db: Session = Depends(get_db)):
        if request.message.text.startswith('видалити зі стоп-листа'):
            return await bot_contents.del_dish_from_stoplist(request, db)
        elif not request.message.text.startswith('видалити зі стоп-листа') or hasattr(self, "next_handler"):
            await self._next_handler.handle_request(request, db)


class UnknownCommand(AbstractHandler):
    async def handle_request(self, request: BotUpdateModel, db: Session = Depends(get_db)):
        if request.message.text:
            content = request.message.text
            gpt = Gpt(content)
            message = gpt.get_answer()
            await bot_contents.send_message(request=request, message=message)
            return await bot_contents.send_home(request)
        elif hasattr(self, "next_handler"):
            await self._next_handler.handle_request(request, db)

async def bot_request_handler_chain():

    start_handler = StartHandler()
    user_registration_handler = UserRegistrationHandler()
    secret_check_handler = SecretCheckHandler()
    admin_registration_handler = AdminRegistrationHandler()
    stop_list_handler = StopListHandler()
    categorias_handler = CategoriesHandler()
    dishes_handler = DishesHandler()
    del_dish_handler = DelDishHandler()
    add_to_stop_list_handler = AddDishToStopListHandler()
    del_from_stop_list_handler = DelDishFromStopListHandler()
    unknown_command = UnknownCommand()

    start_handler.set_next(user_registration_handler)
    user_registration_handler.set_next(secret_check_handler)
    secret_check_handler.set_next(admin_registration_handler)
    admin_registration_handler.set_next(stop_list_handler)
    stop_list_handler.set_next(categorias_handler)
    categorias_handler.set_next(dishes_handler)
    dishes_handler.set_next(del_dish_handler)
    del_dish_handler.set_next(add_to_stop_list_handler)
    add_to_stop_list_handler.set_next(del_from_stop_list_handler)
    del_from_stop_list_handler.set_next(unknown_command)
    unknown_command.set_next(start_handler)
    

    return start_handler





