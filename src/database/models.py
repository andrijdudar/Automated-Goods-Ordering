from typing import List

from enum import Enum
import enum

from sqlalchemy import Column, Integer, String, Boolean, DateTime, func, Table, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.sql.sqltypes import DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()



image_m2m_tag = Table(
    "note_m2m_tag",
    Base.metadata,
    Column("id", Integer, primary_key=True),
    Column("dish_id", Integer, ForeignKey("dishes.id", ondelete="CASCADE")),
    Column("tag_id", Integer, ForeignKey("tags.id", ondelete="CASCADE")),
)


class Dish(Base):
    __tablename__ = "dishes"
    id = Column(Integer, primary_key=True)
    image_url = Column(String(255), nullable=True)
    image_public_id = Column(String(255))
    dish_name = Column(String(200), unique=True)
    description = Column(String(900))
    ingredients = Column(String(900))
    user_id = Column('user_id', ForeignKey('users.id', ondelete='CASCADE'), default=None)
    tags = relationship("Tag", secondary=image_m2m_tag, back_populates="dishes")
    stop_list = Column(Boolean)
    price = Column(Integer)
    created_at = Column("created_at", DateTime, default=func.now())
    updated_at = Column("updated_at", DateTime, default=func.now(), onupdate=func.now())
    category_id = Column(Integer, ForeignKey('categories.id'))
    category = relationship('Category', back_populates='dishes')


class Category(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, unique=True)
    parent_id = Column(Integer, ForeignKey('categories.id'))
    parent = relationship('Category', remote_side=id, back_populates='child')
    child = relationship('Category', back_populates='parent')
    dishes = relationship('Dish', back_populates='category')



class Tag(Base):
    __tablename__ = "tags"
    id = Column(Integer, primary_key=True)
    name_tag = Column(String(25), nullable=False, unique=True)
    dishes  = relationship("Dish", secondary=image_m2m_tag, back_populates="tags")




class Role(enum.Enum):
    __tablename__ = 'users_roles'
    admin: str = 'admin'
    user: str = 'user'

      
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String(150), nullable=True)
    first_name = Column(String(150), nullable=True)
    last_name = Column(String(150), nullable=True)
    chat_id = Column(Integer, unique=True)
    email = Column(String(100))
    password = Column(String(255), nullable=False)
    created_at = Column('created_at', DateTime, default=func.now())
    refresh_token = Column(String(255))
    banned = Column(Boolean, default=False)
    role = Column('role', Enum(Role), default=Role.user)
    bot_role = Column(String(15))
    information = Column(String, nullable=True)





