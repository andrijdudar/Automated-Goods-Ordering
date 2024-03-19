from fastapi import status, HTTPException
from sqlalchemy.orm import Session
from icecream import ic

from src.schemas import DishModel, UpdateDishModel
from src.database.models import Dish, Tag, Category, User
from src.services.images import image_cloudinary
from src.repository.tags import find_tags



async def get_all_dishes(db: Session):
    """
    Retrieve a list of all dishes from the database.

    Args:
        db (Session): The database session.

    Returns:
        List[Dish]: A list containing instances of the Dish model representing all dishes.

    """
    return db.query(Dish).order_by(Dish.id).all()
    


async def get_dish(dish_id: int, db: Session):
    """
    Retrieve details of a specific dish by ID.

    Args:
        dish_id (int): The unique identifier of the dish.
        db (Session): The database session.

    Returns:
        Dish: An instance of the Dish model representing the details of the requested dish.

    Raises:
        HTTPException: If the dish with the specified ID is not found, raises a 404 Not Found error.
    """
    return db.query(Dish).filter(Dish.id == dish_id).first()
  


async def add_new_dish(
                    dish_name,
                    description,
                    ingredients,
                    tags,
                    category,
                    price,  
                    image_url, 
                    image_public_id,
                    db: Session):
    """
    Add a new dish to the database.

    Args:
        dish_name (str): The name of the new dish.
        description (str): The description of the new dish.
        ingredients (str): The list of ingredients for the new dish.
        tags (str): The tags associated with the new dish.
        category (str): The category to which the new dish belongs.
        price (float): The price of the new dish.
        image_url (str): The URL of the image associated with the new dish.
        image_public_id (str): The public ID of the image in the cloud storage.
        db (Session): The database session.

    Returns:
        DishModel: An instance of the DishModel representing the details of the newly added dish.
    """
    if tags:
        tags = await find_tags(tags, db)
    category_db = db.query(Category).filter(Category.name == category).first()
    new_dish = Dish(dish_name=dish_name, 
                         description=description, 
                         tags=tags, 
                         image_url=image_url, 
                         ingredients=ingredients,
                         image_public_id=image_public_id,
                         category_id=category_db.id,
                         price=price,
                         stop_list = False)
    db.add(new_dish)
    db.commit()
    await get_dish(new_dish.id, db)



async def update_dish(id: int, 
                      name: str, 
                      description: str, 
                      ingredients: str, 
                      tags: str, 
                      category: str, 
                      price: int, 
                      image_url: str, 
                      image_public_id: str, 
                      db: Session): 
    """
    Update details of a specific dish in the database.

    Args:
        id (int): The unique identifier of the dish to be updated.
        name (str): The new name of the dish.
        description (str): The new description of the dish.
        ingredients (str): The new list of ingredients for the dish.
        tags (str): The new tags associated with the dish.
        category (str): The new category to which the dish belongs.
        price (int): The new price of the dish.
        image_url (str): The new URL of the dish's image.
        image_public_id (str): The new public ID of the dish's image in the cloud storage.
        db (Session): The database session.

    Returns:
        Dish: An instance of the Dish model representing the updated dish.
    """
    if tags:
        tags = await find_tags(tags, db)
    category_db = db.query(Category).filter(Category.name == category).first()
    dish = db.query(Dish).filter(Dish.id == id).first()
    if dish.image_public_id:
        await image_cloudinary.delete_image(dish.image_public_id)
    dish.dish_name = name
    dish.description = description
    dish.ingredients = ingredients
    dish.category_id = category_db.id
    dish.image_public_id = image_public_id
    dish.image_url = image_url
    dish.price = price
    dish.stop_list = False
    dish.tags = tags
    db.commit()
    return dish


async def update_photo(id: int, image_url: str, image_public_id: str, db: Session):
    """
    Update the photo of a dish in the database.

    Args:
        id (int): The unique identifier of the dish to be updated.
        image_url (str): The new URL of the dish's photo.
        image_public_id (str): The new public ID of the dish's photo in the cloud storage.
        db (Session): The database session.

    Returns:
        Dish: An instance of the Dish model representing the updated dish.
    """
    dish = db.query(Dish).filter(Dish.id == id).first()
    if dish.image_public_id:
        await image_cloudinary.delete_image(dish.image_public_id)
    dish.image_url = image_url
    dish.image_public_id = image_public_id
    db.commit()
    return dish


async def patch(body: UpdateDishModel, db: Session):
    """
    Update specific fields of a dish in the database.

    Args:
        body (UpdateDishModel): An instance of UpdateDishModel containing the fields to update.
        db (Session): The database session.

    Returns:
        Dish: An instance of the Dish model representing the updated dish.
    """
    dish = db.query(Dish).filter(Dish.id == body.id).first()
    if body.name:
        dish.dish_name = body.name
    if body.description:
        dish.description = body.description
    if body.ingredients:
        dish.ingredients = body.ingredients
    if body.category:
        category = db.query(Category).filter(Category.name == body.category).first()
        dish.category_id = category.id
    if body.price:
        dish.price = body.price
    if body.tags:
        tags = await find_tags(body.tags, db)
        dish.tags = tags
    db.commit()
    return dish


async def delete_dish(id: int, db: Session):
    """
    Delete a specific dish from the database.

    Args:
        id (int): The unique identifier of the dish to be deleted.
        db (Session): The database session.

    Returns:
        dict: A dictionary with a message indicating the success of the deletion.
    """
    dish = db.query(Dish).filter(Dish.id == id).first()
    db.delete(dish)
    db.commit()
    return{"message": "The Dish is correctly deleted"}

