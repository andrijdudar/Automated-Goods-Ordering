import json

from fastapi import status, HTTPException
from sqlalchemy.orm import Session


from src.database.models import Dish, Tag, Category, User


async def fill_categorias_to_base(db: Session):
    
    home_category = Category(name='home')
    menu_category = Category(name='меню', parent=home_category)
    stoplist_category = Category(name='стоп-лист', parent=home_category)
    bar_category = Category(name='бар', parent=menu_category)
    wine_category = Category(name='вина', parent=bar_category)
    white_wine_category = Category(name='білі вина', parent=wine_category)
    red_wine_category = Category(name='червоні вина', parent=wine_category)
    pink_wine_categorry = Category(name='рожеві вина', parent=wine_category)
    sparkling_wine_categorry = Category(name='ігристі та кріплені вина', parent=wine_category)
    cocktails_category = Category(name='коктейлі', parent=bar_category)
    non_alcohol_drinks_category = Category(name='безалкогольні напої', parent=bar_category)
    hot_drinks_category = Category(name='гарячі напої', parent=bar_category)
    soft_drinks_category = Category(name='soft drinks', parent=non_alcohol_drinks_category)
    lemonades_category = Category(name='лимонади', parent=non_alcohol_drinks_category)
    bear_category = Category(name='пиво', parent=bar_category)
    alcohol_category = Category(name = 'міцні напої', parent=bar_category)
    vermuths_category = Category(name='вермути і лікери', parent=alcohol_category)
    whiskey_category = Category(name='віскі', parent=alcohol_category)
    horilka_category = Category(name='горілка', parent=alcohol_category)
    brandy_category = Category(name='коньяки та бренді', parent=alcohol_category)
    rum_and_gin_category = Category(name='роми та джини', parent=alcohol_category)
    tequila_category = Category(name='текіла', parent=alcohol_category)

    kitchen_category = Category(name='кухня', parent=menu_category)
    burgers_category = Category(name='бургери', parent=kitchen_category)
    garnish_category = Category(name='гарніри', parent=kitchen_category)
    desert_category = Category(name='десерти', parent=kitchen_category)
    main_dishes_category = Category(name='основні страви', parent=kitchen_category)
    first_dishes_category = Category(name='перші страви', parent=kitchen_category)
    salats_category = Category(name='салати', parent=kitchen_category)
    sous_category = Category(name='соуси', parent=kitchen_category)
    cold_dishes_category = Category(name='холодні закуски', parent=kitchen_category)
    brakefast_category = Category(name='сніданки', parent=kitchen_category)
    categories = [home_category, menu_category, stoplist_category, bar_category, 
                  wine_category, white_wine_category, red_wine_category, pink_wine_categorry, 
                  sparkling_wine_categorry, cocktails_category, non_alcohol_drinks_category, 
                  hot_drinks_category, soft_drinks_category, lemonades_category, bear_category, 
                  alcohol_category, vermuths_category, whiskey_category, horilka_category, 
                  brandy_category, rum_and_gin_category, tequila_category, kitchen_category, 
                  burgers_category, garnish_category, desert_category, main_dishes_category, 
                  first_dishes_category, salats_category, sous_category, cold_dishes_category, 
                  brakefast_category]

    db.add_all(categories)
    db.commit()
    return categories



async def fill_restorant_menu_to_base(db: Session):

    with open("restorant_data\\dynamo_blues_data.json", "r", encoding="utf-8")as fb:
        dynamo_data = json.load(fb)


    for key, dish_info in dynamo_data.items():
        if 'tags' not in dish_info:
            continue
        dish_info: dict
        tags = dish_info['tags']
        name = dish_info['name']
        existing_dish = db.query(Dish).filter(Dish.dish_name == name).first()
        if not existing_dish:
            category = tags[0]
            ingredients = dish_info['ingaredients']
            
            for tag_name in tags:
                if len(tag_name) < 25:
                    # Check if the tag already exists in the database
                    existing_tag = db.query(Tag).filter(Tag.name_tag == tag_name).first()

                    if existing_tag is not None:
                        # Use the existing tag
                        db_tag = existing_tag
                    else:
                        # Create a new tag
                        db_tag = Tag(name_tag=tag_name)
                        db.add(db_tag)
                        db.commit()
                        db.refresh(db_tag)
            dish_tags = db.query(Tag).filter(Tag.name_tag.in_(tags)).all()
            dish_category = db.query(Category).filter(Category.name == category).first()
            new_dish = Dish(dish_name=name, tags=dish_tags, ingredients=ingredients, category=dish_category)
            db.add(new_dish)
            db.commit()

    return {'message': 'ok'}


async def clean_data(db: Session):
    dishes = db.query(Dish).all()
    for dish in dishes:
        db.delete(dish)
        db.commit()
    return {"message": 'ok'}



