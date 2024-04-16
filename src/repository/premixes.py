from fastapi import status, HTTPException
from sqlalchemy.orm import Session


from src.schemas import PremixModel, PremixResponseModel
from src.database.models import Dish, Tag, Category, User, Ingredient,Premix
from src.services.images import image_cloudinary
from src.repository.tags import find_tags


async def get_all_premixes(db: Session) -> list[Premix]:
    premixes = db.query(Premix).all()
    return premixes


async def get_premix(id: int, db: Session) -> Premix:
    premix = db.query(Premix).filter(Premix.id==id).first()
    premix_response = PremixResponseModel(
        name=premix.name,
        description=premix.description,
        ingredients=[{"id": ingredient.id, "quantity": relationship.quantity} for ingredient, relationship in premix.ingredients]
    )
    return premix_response


async def create_premix(body: PremixModel, db: Session) -> Premix:
    premix_data = body.dict(exclude_unset=True)
    ingredients_data = premix_data.pop('ingredients', [])
    new_premix = Premix(**premix_data)
    
    if ingredients_data:
        for ingredient_data in ingredients_data:
            ingredient = db.query(Ingredient).filter_by(id=ingredient_data['id']).first()
            quantity = ingredient_data.get('quantity')
            new_premix.ingredients.append(ingredient, {'quantity': quantity})
    
    db.add(new_premix)
    db.commit()
    db.refresh(new_premix)
    return new_premix


async def delete_premix(id: int, db: Session):
    premix = db.query(Premix).filter(Premix.id == id).first()
    db.delete(premix)
    db.commit()
    return {"message": "Premix successfuly deleted"}