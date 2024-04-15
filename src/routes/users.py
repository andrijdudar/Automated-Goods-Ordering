from dotenv import load_dotenv


from fastapi import FastAPI, Request, APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from src.schemas import  OkResponseModel, UsersResponseModel
from src.database.db_connection import get_db
from src.repository import users as reposetory_users
from src.database.models import User

router = APIRouter(prefix='/users')


@router.get("/", response_model=list[UsersResponseModel])
async def get_users(db: Session = Depends(get_db)):
    users = await reposetory_users.get_users(db)
    if not users:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                             detail="Users not found")
    return users


@router.get("/user/{id}", response_model=UsersResponseModel)
async def get_user(id: int, db: Session = Depends(get_db)):
    user = await reposetory_users.get_user(id, db)
    if not user:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                             detail="User not found")
    return user


@router.patch("/patch", response_model=UsersResponseModel)
async def patch_user(body: UsersResponseModel, db: Session = Depends(get_db)):
    user = await reposetory_users.patch_user(body, db)
    if not user:
        HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                      detail="User not found")
    return user


@router.delete('/delete', response_model=OkResponseModel)
async def del_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    for user in users:
        db.delete(user)
        db.commit()

    return {'message': 'ok'}


@router.delete("/delete/{id}")
async def delete_user(id: int, db: Session = Depends(get_db)):
    return await reposetory_users.delete_user(id, db)