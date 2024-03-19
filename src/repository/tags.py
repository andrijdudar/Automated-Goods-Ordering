from fastapi import status, HTTPException
from sqlalchemy.orm import Session
from icecream import ic

from src.schemas import DishModel
from src.database.models import Dish, Tag, Category, User
from src.services.images import image_cloudinary


async def get_tags(db: Session) -> list[Tag]:
    """
    Retrieve a list of all tags from the database.

    Args:
        db (Session): The database session.

    Returns:
        list[Tag]: A list containing instances of the Tag model representing all tags.
    """
    tags = db.query(Tag).order_by(Tag.id).all()
    return tags


async def delete_tag(id: int, db: Session):
    """
    Delete a specific tag from the database.

    Args:
        id (int): The unique identifier of the tag to be deleted.
        db (Session): The database session.

    Returns:
        dict: A dictionary with a message indicating the success of the deletion.

    """
    tag = db.query(Tag).filter(Tag.id == id).first()
    db.delete(tag)
    db.commit()
    return {"message": "The tag is correctly deleted"}


async def delete_tags(db: Session):
    """
    Delete all tags from the database.

    Args:
        db (Session): The database session.

    Returns:
        dict: A dictionary with a message indicating the success of the deletion.
    """
    tags = db.query(Tag).all()
    for tag in tags:
        db.delete(tag)
        db.commit()
    return {"message": "All tags is correctly deleted"}


async def find_tags(tags: str, db: Session) -> list[Tag]:
    """
    Find or create tags in the database based on a string representation of tags.

    Args:
        tags (str): A string containing tags separated by commas, periods, or slashes.
        db (Session): The database session.

    Returns:
        list[Tag]: A list containing instances of the Tag model representing the found or created tags.
    """
    tags = tags.replace(",", " ").replace(".", " ").replace("/", " ").split()
    dish_tags = []
    if tags:
        for tag in tags:
            if not db.query(Tag).filter(Tag.name_tag == tag.lower()).first():
                db_tag = Tag(name_tag=tag.lower())
                db.add(db_tag)
                db.commit()
                db.refresh(db_tag)
            dish_tags.append(tag.lower())
    tags = db.query(Tag).filter(Tag.name_tag.in_(dish_tags)).all()
    return tags


