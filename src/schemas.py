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

class CommentResponseModel(BaseModel):
    id: int
    comment: str

############################################

class ProviderResponse(BaseModel):
    id: int
    provider_name: str
    salesman_name: str
    salesman_phone: int
    info: str



#############################################
class IngredientModel(BaseModel):
    id: int
    name: str
    quantity: float

class IngredientResponseModel(BaseModel):
    id: int
    name: str
    amount: float
    suma: float
    stock_minimum: float
    stock_maximum: float
    standart_container: float
    measure: str
    using: bool



#######################################33

class PremixModel(BaseModel):
    name: str
    ingredients: list[IngredientModel]
    description: str

class PremixResponseModel(BaseModel):
    name: str
    ingredients: list[IngredientModel]
    description: str

class PremixToDishModel(BaseModel):
    id: int
    name: str
    description: str
    quantity: float


###########################################3


class DishModel(BaseModel):
    dish_name: str
    description: str = None
    comment: str
    ingredients: list[IngredientModel]
    premixes: list[PremixToDishModel] = None
    tags: list[str] = None
    category: str
    price: int = None


class DishResponseModel(BaseModel):
    id: int
    image_url: Any
    image_public_id: Any
    dish_name: str
    description: Any
    comments: list[CommentResponseModel]
    ingredients: list[IngredientModel]
    premixes: list[PremixToDishModel]
    # user_id: Any
    first_name: str = None
    tags: list[TagResponseModel] = Any
    stop_list: Any
    need_to_sold: Any
    category_name: str = None
    category_id: int = None
    created_at: datetime
    updated_at: datetime = None



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
    
#########################################

class CommentDeleteResponse(BaseModel):
    id: int = 1
    comment: str = 'My comment'

    class Config:
        orm_mode = True


class CommentResponse(BaseModel):
    id: int = 1
    comment: str
    username: UserDb
    image_id: int = 1

    class Config:
        orm_mode = True


class CommentModel(BaseModel):
    comment: str = Field(min_length=1, max_length=255)
    image_id: int = Field(1, gt=0)


class CommentModelUpdate(BaseModel):
    comment: str = Field(min_length=1, max_length=255)
    comment_id: int = Path(ge=1)


################################################
    
class IngOrderModel(BaseModel):
    id: int
    name: str
    quantity: int

class OrederIngByProvider(BaseModel):
    id: int
    name: str
    order: list[IngOrderModel]


################################################

class UsersResponseModel(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str
    email: str
    information: str
    role: str

class UserModel(BaseModel):
    username: str
    first_name: str
    role: str
    information: str