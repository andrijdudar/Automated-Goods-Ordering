from datetime import datetime
from pydantic import BaseModel, Field
from typing import ClassVar, Annotated
from fastapi import UploadFile, File
from src.database.models import Tag
from typing import Optional, Any, Union



class FromTG(BaseModel):
    chat_id: int = Field(alias='id') 
    is_bot: bool 
    first_name: str 
    last_name: str = None
    username: str = None
    language_code: str 


class BotMessage(BaseModel):
    message_id: int
    from_tg: FromTG = Field(alias='from')
    chat: dict
    date: int
    text: str


class BotUpdateModel(BaseModel):
    
    update_id: int
    message:BotMessage  


class ReplyKeyboardMarkup(BaseModel):
    keyboard: list


class KeyboardButton(BaseModel):
    text: str


##############################################
    
class TagResponseModel(BaseModel):
    id: int
    name_tag: str


#############################################


class DishModel(BaseModel):
    dish_name: str
    description: str = None
    ingredients: str = None
    tags: list[str] = None
    category: str
    price: int = None


class DishResponseModel(BaseModel):
    id: int
    image_url: Any
    image_public_id: Any
    dish_name: str
    description: Any
    ingredients: str
    user_id: Any
    first_name: str = None
    tags: list[TagResponseModel] = Any
    created_at: datetime
    updated_at: datetime = None
    stop_list: Any
    category_name: str = None
    category_id: int = None



#################################33########

class OkResponseModel(BaseModel):
    message: str


#########################################33


class GetChildRequest(BaseModel):
    name: str


#########################################

class CategoryModel(BaseModel):
    name: str
    parent: str = None


class CategoryResponseModel(BaseModel):
    id: int
    name: str
    parent_id: Union[int, None]
    child: bool
    dishes: bool

#########################################
    
class UpdateDishModel(BaseModel):
    id: int
    name: str = None
    description: str = None
    ingredients: str = None
    tags: str = None
    category: str = None
    price: int = None

########################################3

class AddPhotoModel(BaseModel):
    photo: Annotated[bytes, File()]

class HelloResponsemodel(BaseModel):
    BotMessage: str


class UploadTextModel(BaseModel):
    message: str
    
