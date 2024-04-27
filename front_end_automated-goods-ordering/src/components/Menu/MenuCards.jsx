/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import useStore from "../../StoreZustand";
import './MenuCards.scss';
import { deleteDish, getAllDishes } from '../../utils/fetch';
import { Link } from 'react-router-dom';
// import cn from 'classnames';

export const MenuCards = () => {
  const setDishesCategory = useStore((state) => state.setDishesCategory);
  const dishesCategory = useStore((state) => state.dishesCategory);
  const setDishes = useStore((state) => state.setDishes);
  const [currentCardId, setCurrentCardId] = useState(null);
  const titleCategory = useStore((state) => state.titleCategory);
  const searchDishes = useStore((state) => state.searchDishes);

  // const setTitleCategory = useStore((state) => state.setTitleCategory);

  // const [titleSelectedCategory, setTitleSelectedCategory] = useState('Всі страви');
  // const [localDishesCategory, setLocalDishesCategory] = useState([]);

  useEffect(() => {
    // setLocalDishesCategory(dishesCategory);
  }, [dishesCategory]);

  useEffect(() => {
    getAllDishes()
      .then((data) => {
        setDishes(data);
        setDishesCategory(data);
        // setLocalDishesCategory(data);
        localStorage.setItem('dishes', JSON.stringify(data));
      })
      .catch(() => {
        const dishesLS = JSON.parse(localStorage.getItem('dishes'));
        setDishes(dishesLS);
        setDishesCategory(dishesLS);
        // setLocalDishesCategory(dishesLS);
      });
  }, []);



  const toggleCard = (card) => {
    if (currentCardId === card.id) {
      setCurrentCardId(null);
      return;
    }
    setCurrentCardId(card.id);
  };

  return (
    <div className="menuCards">
      <div>
        <h1>
          {titleCategory.charAt(0).toUpperCase() + titleCategory.slice(1)}
        </h1>
      </div>

      <div className="cards">
        {searchDishes.map(card => {
          const currentCardIngredients = card.ingredients.split(', ');
          return (
            <div
              key={card.id}
              className={`card ${currentCardId === card.id ? 'active' : ''}`}
              onClick={() => toggleCard(card)}
              style={{
                backgroundImage: card.image_url && `url(${card.image_url})`
              }}
            >
              <div className="card__content">
                <div className="card__content-inner">
                  <div className="card__title">{card.dish_name}</div>
                  <div className="card__description">
                    <ul className="ingredients">
                      <li>
                        <ul>
                          {currentCardIngredients.map((item, index) => (
                            <>
                              <li key={index}>{item}</li>
                              <hr />
                            </>
                          ))}
                        </ul>
                      </li>

                    </ul>
                    <div className="description">
                      {card.description}
                    </div>
                    <div className="btn-card">
                      <Link to='/newdish' className="button is-link is-rounded is-hover">
                        Редагувати
                      </Link>
                      <button
                        className="button is-danger is-rounded is-hover"
                        onClick={() => deleteDish(card.id)}
                      >
                        Видалити
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};
