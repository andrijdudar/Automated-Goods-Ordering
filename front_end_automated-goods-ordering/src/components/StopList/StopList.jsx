/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useLocalStorage } from '../../utils/useLocalStorege';
import useStore from '../../StoreZustand';
import './StopList.css';
import { getDishesInStopList, getDishesToBeSold, getFewDishes } from '../../utils/fetch';


const StopList = () => {
  const [stopListLS, setStopListLS] = useLocalStorage('stopList', []);
  const [fewDishesLS, setFewDishesLS] = useLocalStorage('fewDishes', []);
  const [dishesToBeSoldLS, setDishesToBeSoldLS] = useLocalStorage('dishesToBeSold', []);

  const setFewDishes = useStore((state) => state.setFewDishes);
  const setStopList = useStore((state) => state.setStopList);
  const setDishesToBeSold = useStore((state) => state.setDishesToBeSold);

  useEffect(() => {
    getDishesInStopList()
      .then((res) => {
        // console.log(res);
        // setStopListLS(res);
        // setStopList(res);
      })
      .catch((err) => console.log(err));

    getDishesToBeSold()
      .then((res) => {
        // console.log(res);
        // setDishesToBeSoldLS(res);
        // setDishesToBeSold(res);
      })
      .catch((err) => console.log(err));

    getFewDishes()
      .then((res) => {
        // console.log(res);
        // setFewDishesLS(res);
        // setFewDishes(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="stopList">
      <h1>Стоп-Лист</h1>
      <div className='stoplist-container'>
        <div className='stoplist-kichen'>
          <h2>Кухня</h2>
          <ul>
            {stopListLS.map((dish, index) => (
              <li className='item' key={index}>
                <span>{dish.dish_name}</span><button className='btn-x'>x</button>
              </li>
            ))}
          </ul>
        </div>
        <div className='stoplist-bar'>
          <h2>Бар</h2>
          <ul>
            {stopListLS.map((dish, index) => (
              <li className='item' key={index}>
                <span>{dish.dish_name}</span><button className='btn-x'>x</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h1>Мало</h1>
      <div className='stoplist-container'>
        <div className='stoplist-kichen'>
          <h2>Кухня</h2>
          <ul>
            {fewDishesLS.map((dish, index) => (
              <li className='item'>
                <span>{dish.dish_name}</span><button className='btn-x'>x</button>
              </li>
            ))}
          </ul>
        </div>
        <div className='stoplist-bar'>
          <h2>Бар</h2>
          <ul>
            {fewDishesLS.map((dish, index) => (
              <li className='item'>
                <span>{dish.dish_name}</span><button className='btn-x'>x</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h1>Продавати</h1>
      <div className='stoplist-container'>
        <div className='stoplist-kichen'>
          <h2>Кухня</h2>
          <ul>
            {dishesToBeSoldLS.map((dish) => (
              <li className='item' key={dish.id}>
                <span>{dish.dish_name}</span><button className='btn-x'>x</button>
              </li>
            ))}
          </ul>
        </div>
        <div className='stoplist-bar'>
          <h2>Бар</h2>
          <ul>
            {dishesToBeSoldLS.map((dish) => (
              <li className='item' key={dish.id}>
                <span>{dish.dish_name}</span><button className='btn-x'>x</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StopList;
