import json
import uvicorn
import ngrok
from icecream import ic
import os

from dotenv import load_dotenv

from aiohttp import ClientSession
from fastapi import FastAPI, Request, APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from src.schemas import CategoryModel, GetChildRequest, DishResponseModel, CategoryResponseModel
from src.database.db_connection import get_db
from src.repository import categories
from src.database.models import Category


router = APIRouter(prefix='/categories')

@router.get('/get_children/{name}', response_model=list[GetChildRequest])
async def get_children_by_name(name: str, db: Session = Depends(get_db)):
    result = [{'name': 'not faund'}]
    category = db.query(Category).filter(Category.name == name).first()
    if category:
        result_list = []
        children = category.child
        for child in children:
            ic(child)
            ch_name = {'name': child.name}
            result_list.append(ch_name)
        return result_list

    return result


@router.get("/", response_model=list[CategoryResponseModel], 
            status_code=status.HTTP_200_OK)
async def get_categories(db: Session = Depends(get_db)):
    categories_list = await categories.get_categories(db)
    if not categories_list:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail="categories not found")
    return categories_list


@router.get("/get_category/{id}", response_model=CategoryResponseModel,
            status_code=status.HTTP_200_OK)
async def get_category(id: int, db: Session = Depends(get_db)):
    category = await categories.get_category(id, db)
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail="category not found")
    return category


@router.get("/get_dishes/{id}",response_model=list[DishResponseModel],
            status_code=status.HTTP_200_OK)
async def get_category_dishes(id: int, db: Session = Depends(get_db)):
    dishes = await categories.get_category_dishes(id, db)
    if not dishes:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail="the category has no dishes")
    return dishes



@router.post('/add_category',response_model=CategoryResponseModel , status_code = status.HTTP_201_CREATED)
async def add_new_category(body: CategoryModel, db: Session = Depends(get_db)):
    return await categories.add_new_category(body, db)


@router.delete("/delete/{id}",status_code=status.HTTP_204_NO_CONTENT)
async def delete_category(id: int, db: Session = Depends(get_db)):
    return await categories.delete_category(id, db)


