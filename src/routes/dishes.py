import uuid
import io

from fastapi import HTTPException,APIRouter, Depends, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from PIL import Image

from src.schemas import DishResponseModel, UpdateDishModel
from src.database.db_connection import get_db
from src.database.models import Dish, Category
from src.repository import dishes, bot_contents
from src.services.images import image_cloudinary, resize_image


router = APIRouter(prefix='/dishes')


@router.get('/{dish_id}', response_model=DishResponseModel)
async def get_dish(dish_id:int, db: Session = Depends(get_db)):
     dish =  await dishes.get_dish(dish_id, db)
     if dish is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Dish not found"
        )
     return dish


@router.get('/', response_model=list[DishResponseModel], status_code=status.HTTP_200_OK)
async def get_all_dishes(db: Session = Depends(get_db)):
     dishes_list = await dishes.get_all_dishes(db)
     if dishes_list is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Dishes not found"
        )
     return dishes_list


@router.post('/create_new_dish', response_model=DishResponseModel, status_code=status.HTTP_201_CREATED)
async def create_new_dish(name: str = Form(),
                          description: str = Form(),
                          ingredients: str = Form(),
                          tags: str = Form(None), 
                          category: str = Form(None),
                          price: int = Form(None),
                          file: UploadFile = File(), 
                          db: Session = Depends(get_db)):
     file.filename = f"{uuid.uuid4()}.jpg"
     contents =  await file.read()
     resized_contents = resize_image(contents)
     image_url, image_public_id = await image_cloudinary.add_image(resized_contents)
     dish = await dishes.add_new_dish(name, 
                                      description, 
                                      ingredients, 
                                      tags, 
                                      category, 
                                      price, 
                                      image_url, 
                                      image_public_id, 
                                      db)
     if dish is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Dish not found"
        )
     return dish


@router.put("/update", 
            response_model=DishResponseModel, 
            status_code=status.HTTP_202_ACCEPTED)
async def update_dish(id: int = Form(),
                      name: str = Form(),
                      description: str = Form(),
                      ingredients: str = Form(),
                      tags: str = Form(None), 
                      category: str = Form(None),
                      price: int = Form(None),
                      file: UploadFile = File(), 
                      db: Session = Depends(get_db)):
    file.filename = f"{uuid.uuid4()}.jpg"
    contents =  await file.read()
    resized_contents = resize_image(contents)
    image_url, image_public_id = await image_cloudinary.add_image(resized_contents)
    dish = await dishes.update_dish(id, 
                                    name, 
                                    description, 
                                    ingredients, 
                                    tags, 
                                    category, 
                                    price, 
                                    image_url, 
                                    image_public_id, 
                                    db)
    if dish is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Dish not found"
        )
    return dish


@router.patch('/update_photo',
              response_model=DishResponseModel, 
              status_code=status.HTTP_202_ACCEPTED)
async def update_photo(id: int = Form(), 
                       file: UploadFile = File(), 
                       db: Session=Depends(get_db)):
    file.filename = f"{uuid.uuid4()}.jpg"
    contents =  await file.read()
    resized_contents = resize_image(contents)
    image_url, image_public_id = await image_cloudinary.add_image(resized_contents)
    dish = await dishes.update_photo(id, image_url, image_public_id, db)
    if dish is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Dish not found"
        )
    return dish


@router.patch("/patch", 
              response_model=DishResponseModel,
              status_code=status.HTTP_202_ACCEPTED)
async def patch_dish(body: UpdateDishModel, db: Session = Depends(get_db)):
    dish = await dishes.patch(body, db)
    if dish is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Dish not found"
        )
    return dish


@router.delete("/delete/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_dish(id: int, db: Session = Depends(get_db)):
    return await dishes.delete_dish(id, db)

# @router.post('/add_photo/', status_code=status.HTTP_201_CREATED)
# async def add_photo(file: UploadFile = File()):
#      # file.filename = f"{uuid.uuid4()}.jpg"
#      # contents =  await file.read()
#      # resized_contents = resize_image(contents, new_width=500, new_height=400)
#      # image_url, image_public_id = await image_cloudinary.add_image(resized_contents)
#      return {"message": "ok"}


# @router.post('/upload/')
# async def uplpoad(body: UploadTextModel, status_code=status.HTTP_200_OK):#photo: UploadFile = File(...)):
#      print(body)
#      return {'message': 'ok'}
     
#      # with open (photo.filename, 'wb') as file:
#      #      file.write(photo.file.read())
#      # return {'message': 'ok'}


# @router.post("/test/")
# async def test(name: str = Form(None),file: UploadFile = File(), category: str = Form(None), db: Session = Depends(get_db)):
#      print(category)
#      category_db = db.query(Category).filter(Category.name == "test2").first()
#      print(category_db.name)
#      return {"message": "ok"}