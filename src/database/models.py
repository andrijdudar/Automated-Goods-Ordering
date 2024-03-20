from typing import List

from enum import Enum
import enum

from sqlalchemy import Column, Integer,Float, String, Boolean, DateTime, func, Table, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.sql.sqltypes import DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()



dish_m2m_tag = Table(
    "dish_m2m_tag",
    Base.metadata,
    Column("id", Integer, primary_key=True),
    Column("dish_id", Integer, ForeignKey("dishes.id", ondelete="CASCADE")),
    Column("tag_id", Integer, ForeignKey("tags.id", ondelete="CASCADE")),
)

dish_m2m_ingredient = Table(
    'dish_m2m_ingredient', 
    Base.metadata,
    Column("id", Integer, primary_key=True),
    Column('dish_id', Integer, ForeignKey('dishes.id', ondelete="CASCADE")),
    Column('ingredient_id', Integer, ForeignKey('ingredients.id', ondelete="CASCADE")),
    Column('quantity', Float) 
                          )

dish_m2m_premix = Table(
    'dish_m2m_premix', 
    Base.metadata,
    Column("id", Integer, primary_key=True),
    Column('dish_id', Integer, ForeignKey('dishes.id', ondelete="CASCADE")),
    Column('premix_id', Integer, ForeignKey('premixes.id', ondelete="CASCADE")),
    Column('quantity', Float) 
                          )

premix_m2m_ingredient = Table(
    'premix_m2m_ingredient', 
    Base.metadata,
    Column("id", Integer, primary_key=True),
    Column('premix_id', Integer, ForeignKey('premixes.id', ondelete="CASCADE")),
    Column('ingredient_id', Integer, ForeignKey('ingredients.id', ondelete="CASCADE")),
    Column('quantity', Float) 
                          )


class Dish(Base):
    __tablename__ = "dishes"
    id = Column(Integer, primary_key=True)
    image_url = Column(String(255), nullable=True)
    image_public_id = Column(String(255))
    dish_name = Column(String(200), unique=True)
    description = Column(String(900))
    ingredients =  relationship("Ingredient", secondary=dish_m2m_ingredient, back_populates="dishes")
    user_id = Column('user_id', ForeignKey('users.id', ondelete='CASCADE'), default=None)
    tags = relationship("Tag", secondary=dish_m2m_tag, back_populates="dishes")
    stop_list = Column(Boolean)
    price = Column(Integer)
    created_at = Column("created_at", DateTime, default=func.now())
    updated_at = Column("updated_at", DateTime, default=func.now(), onupdate=func.now())
    category_id = Column(Integer, ForeignKey('categories.id'))
    category = relationship('Category', back_populates='dishes')


class Ingredient(Base):
    __tablename__ = "ingredients"
    id = Column(Integer, primary_key=True)
    name = Column(String(200), unique=True)
    product = Column(String(200), unique=True)
    amount = Column(Integer)
    suma = Column(Integer)
    dishes = relationship("Dish", secondary=dish_m2m_ingredient, back_populates="ingredients")
    provider = Column(Integer, ForeignKey('providers.id'))
    created_at = Column("created_at", DateTime, default=func.now())
    updated_at = Column("updated_at", DateTime, default=func.now(), onupdate=func.now())


class Premix(Base):
    __tablename__ = "premixes"
    id = Column(Integer, primary_key=True)
    name = Column(String(200), unique=True)
    dishes = relationship("Dish", secondary=dish_m2m_premix, back_populates="premixes")
    ingredients = relationship("Ingredient", secondary=premix_m2m_ingredient, back_populates="premixes")
    created_at = Column("created_at", DateTime, default=func.now())
    updated_at = Column("updated_at", DateTime, default=func.now(), onupdate=func.now())



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
    dishes  = relationship("Dish", secondary=dish_m2m_tag, back_populates="tags")




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


class Provider(Base):
    __tablename__ = "providers"
    id = Column(Integer, primary_key=True)
    provider_name = Column(String(200), nullable=True)
    salesman_name = Column(String(200), nullable=True)
    salesman_phone = Column(Integer)


class Client(Base):
    __tablename__ = "clients"
    id = Column(Integer, primary_key=True)
    first_name = Column(String(150), nullable=True)
    last_name = Column(String(150), nullable=True)
    phone= Column(Integer, unique=True)
    birthday = Column(DateTime)
    discount = Column(Integer)
    email = Column(String(100))
    password = Column(String(255), nullable=False)
    created_at = Column('created_at', DateTime, default=func.now())
    refresh_token = Column(String(255))
    information = Column(String, nullable=True)









