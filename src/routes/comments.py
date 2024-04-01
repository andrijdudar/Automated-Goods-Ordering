import uuid
import io

from fastapi import HTTPException,APIRouter, Depends, status, UploadFile, File, Form, Path
from fastapi.security import OAuth2PasswordRequestForm, HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session
from PIL import Image

from src.schemas import CommentResponse, CommentModel, CommentModelUpdate
from src.database.db_connection import get_db
from src.database.models import Dish, Category, User
from src.repository import comments as repository_comments





router = APIRouter(prefix='/comments', tags=["comments"])

security = HTTPBearer()


@router.get('/', response_model=list[CommentResponse], dependencies=[Depends(access_A)])
async def get_comments(db: Session = Depends(get_db)):
    comments = await repository_comments.get_comments(db)
    return comments

@router.post('/', response_model=CommentResponse, status_code=status.HTTP_201_CREATED)
async def create_comment(body: CommentModel, db: Session = Depends(get_db),
                         current_user: User = Depends(auth_service.get_current_user)):
    image = db.query(Image).filter_by(id=body.image_id).first()
    if not image:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No such image")
    comment = await repository_comments.create_comment(body, current_user, db)
    return comment


@router.get('/{comment_id}', response_model=CommentResponse)
async def get_comment_by_id(comment_id: int = Path(ge=1), db: Session = Depends(get_db),
                            _: User = Depends(auth_service.get_current_user)):
    comment = await repository_comments.get_comment_by_id(comment_id, db)
    if not comment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No such comment")
    return comment


@router.get('/image/{image_id}', response_model=list[CommentResponse])
async def get_comment_by_image_id(image_id: int = Path(ge=1), db: Session = Depends(get_db),
                                  _: User = Depends(auth_service.get_current_user)):
    comment = await repository_comments.get_comments_for_photo(image_id, db)
    if not comment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No such photo")
    return comment


@router.put('/{comment_id}', response_model=CommentResponse)
async def update_comment(body: CommentModelUpdate, db: Session = Depends(get_db),
                         current_user: User = Depends(auth_service.get_current_user)):
    comment = await repository_comments.update_comment(body, db, current_user)
    return comment


@router.delete('/{comment_id}', response_model=CommentDeleteResponse, dependencies=[Depends(access_AM)])
async def remove_comment(comment_id: int = Path(ge=1), db: Session = Depends(get_db)):
    comment = await repository_comments.remove_comment(comment_id, db)
    if not comment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No such comment")
    return comment