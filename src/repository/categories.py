from fastapi import status, HTTPException
from sqlalchemy.orm import Session

from src.schemas import CategoryModel
from src.database.models import Dish, Tag, Category, User



async def category_offspring(category: Category) -> dict:
    response = {}
    response["id"] = category.id
    response["name"] = category.name
    response["parent_id"] = category.parent_id
    response["child"] = False
    response["dishes"] = False
    dishes = category.dishes
    if dishes:
        response["dishes"] = True
        return response
    child = category.child
    if child:
        response["child"] = True
        return response
    return response


async def add_new_category(body: CategoryModel, db:Session):
    """
    Add a new category to the database.

    Args:
        body (CategoryModel): An instance of CategoryModel containing information about the new category.
        db (Session): The database session.

    Returns:
        Category: An instance of the Category model representing the newly added category.
    """
    parent = db.query(Category).filter(Category.name == body.parent).first()
    new_caregory = Category(name=body.name,
                            parent_id=parent.id)
    db.add(new_caregory)
    db.commit()
    return new_caregory


async def get_categories(db: Session):
    """
    Retrieve a list of all categories from the database.

    Args:
        db (Session): The database session.

    Returns:
        List[Category]: A list containing instances of the Category model representing all categories.
    """
    categories = db.query(Category).order_by(Category.id).all()
    categories = [await category_offspring(category) for category in categories]
    return categories


async def get_category(id: int, db: Session):
    """
    Retrieve details of a specific category by ID from the database.

    Args:
        id (int): The unique identifier of the category to be retrieved.
        db (Session): The database session.

    Returns:
        Category: An instance of the Category model representing the details of the requested category.

    Raises:
        HTTPException: If the category with the specified ID is not found, raises a 404 Not Found error.
    """
    category = db.query(Category).filter(Category.id == id).first()
    return await category_offspring(category)


async def delete_category(id: int, db: Session):
    """
    Delete a specific category from the database.

    Args:
        id (int): The unique identifier of the category to be deleted.
        db (Session): The database session.

    Returns:
        dict: A dictionary with a message indicating the success of the deletion.

    """
    category = db.query(Category).filter(Category.id == id).first()
    db.delete(category)
    db.commit()
    message = {"message": " Teh Category is correctly deleted"}
    return message


async def get_category_dishes(id: int, db: Session):
    category = db.query(Category).filter(Category.id == id).first()
    return category.dishes


