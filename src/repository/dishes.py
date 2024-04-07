from fastapi import status, HTTPException
from sqlalchemy.orm import Session


from src.schemas import DishModel, UpdateDishModel
from src.database.models import Dish, Tag, Category, User, Ingredient, Premix
from src.services.images import image_cloudinary
from src.repository.tags import find_tags
from src.repository import comments



async def get_all_dishes(db: Session):
    return db.query(Dish).order_by(Dish.id).all()
    


async def get_dish(dish_id: int, db: Session):
    return db.query(Dish).filter(Dish.id == dish_id).first()
  


async def add_new_dish(
                    dish_name,
                    description,
                    ingredients,
                    premixes,
                    tags,
                    category,
                    price,  
                    image_url, 
                    image_public_id,
                    db: Session):
    if tags:
        tags = await find_tags(tags, db)
    category_db = db.query(Category).filter(Category.name == category).first()
    new_dish = Dish(dish_name=dish_name, 
                         description=description, 
                         tags=tags, 
                         image_url=image_url, 
                         image_public_id=image_public_id,
                         category_id=category_db.id,
                         price=price,
                         stop_list = False)
    for ingredient_data in ingredients:
        ingredient = db.query(Ingredient).filter_by(id=ingredient_data['id']).first()
        quantity = ingredient_data.get('quantity')
        new_dish.ingredients.append(ingredient, {'quantity': quantity})
    for premix_data in premixes:
        premix = db.query(Ingredient).filter_by(id=premix_data['id']).first()
        quantity = premix_data.get('quantity')
        new_dish.premixes.append(premix, {'quantity': quantity})  
    db.add(new_dish)
    db.commit()
    await get_dish(new_dish.id, db)



# async def update_dish(id: int, 
#                       name: str, 
#                       description: str, 
#                       ingredients: str, 
#                       tags: str, 
#                       category: str, 
#                       price: int, 
#                       image_url: str, 
#                       image_public_id: str, 
#                       db: Session): 
#     if tags:
#         tags = await find_tags(tags, db)
#     category_db = db.query(Category).filter(Category.name == category).first()
#     dish = db.query(Dish).filter(Dish.id == id).first()
#     if dish.image_public_id:
#         await image_cloudinary.delete_image(dish.image_public_id)
#     dish.dish_name = name
#     dish.description = description
#     dish.ingredients = ingredients
#     dish.category_id = category_db.id
#     dish.image_public_id = image_public_id
#     dish.image_url = image_url
#     dish.price = price
#     dish.stop_list = False
#     dish.tags = tags
#     db.commit()
#     return dish


async def update_photo(id: int, image_url: str, image_public_id: str, db: Session):
    dish = db.query(Dish).filter(Dish.id == id).first()
    if dish.image_public_id:
        await image_cloudinary.delete_image(dish.image_public_id)
    dish.image_url = image_url
    dish.image_public_id = image_public_id
    db.commit()
    return dish


async def patch(body: DishModel, db: Session):
    dish = db.query(Dish).filter(Dish.id == body.id).first()
    if body.name:
        dish.dish_name = body.name
    if body.description:
        dish.description = body.description
    if body.ingredients:
        for ingredient_data in body.ingredients:
            ingredient = db.query(Ingredient).filter_by(id=ingredient_data['id']).first()
            quantity = ingredient_data.get('quantity')
            dish.ingredients.append(ingredient, {'quantity': quantity})
    if body.premixes:
        for premix_data in body.premixes:
            premix = db.query(Ingredient).filter_by(id=premix_data['id']).first()
            quantity = premix_data.get('quantity')
            dish.premixes.append(premix, {'quantity': quantity}) 
    if body.category:
        category = db.query(Category).filter(Category.name == body.category).first()
        dish.category_id = category.id
    if body.comment:
        new_comment = await comments.create_comment()
        dish.comments.append(new_comment)
    if body.price:
        dish.price = body.price
    if body.tags:
        tags = await find_tags(body.tags, db)
        dish.tags = tags
    db.commit()
    return dish


async def delete_dish(id: int, db: Session):
    dish = db.query(Dish).filter(Dish.id == id).first()
    db.delete(dish)
    db.commit()
    return{"message": "The Dish is correctly deleted"}

