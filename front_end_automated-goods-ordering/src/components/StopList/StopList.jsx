/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
// import { useLocalStorage } from '../../utils/useLocalStorege';
import './StopList.css';
import useStore from '../../StoreZustand';
import { getDishesInStopList } from '../../utils/fetch';
import { Loaderr } from '../utils/Loader/Loaderr';


const StopList = () => {
  // const [stopListLS, setStopListLS] = useLocalStorage('stopList', []);
  // const [fewDishesLS, setFewDishesLS] = useLocalStorage('fewDishes', []);
  // const [dishesToBeSoldLS, setDishesToBeSoldLS] = useLocalStorage('dishesToBeSold', []);
  const fewDishes = useStore((state) => state.fewDishes);
  const setFewDishes = useStore((state) => state.setFewDishes);

  const stopList = useStore((state) => state.stopList);
  const setStopList = useStore((state) => state.setStopList);

  const dishesToBeSold = useStore((state) => state.dish_to_sold);
  const setDishToSold = useStore((state) => state.setDishToSold);

  const [loader, setLoader] = useState(false)

  useEffect(() => {
    // const fetchDishesInStopList = async () => {
    //   try {
    //     const res = await getDishesInStopList();
    //     // console.log(res);
    //     // setStopListLS(res);
    //     setStopList(res.stop_list);
    //     setDishToSold(res.runing_out);
    //     setFewDishes(res.need_to_sold);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    // fetchDishesInStopList();
    setLoader(true)
    getDishesInStopList()
      .then((res) => {
        // console.log(res);
        // setStopListLS(res);
        setStopList(res.stop_list);
        setFewDishes(res.runing_out);
        setDishToSold(res.need_to_sold);

      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));

    // getDishesToBeSold()
    //   .then((res) => {
    //     console.log(res);
    //     setDishesToBeSoldLS(res);
    //     setDishesToBeSold(res);
    //   })
    //   .catch((err) => console.log(err));

    // getFewDishes()
    //   .then((res) => {
    //     console.log(res);
    //     setFewDishesLS(res);
    //     setFewDishes(res);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  return (
    <div className='containerStoplist'>
      {loader ? (
        <Loaderr />
      ) : (
        <div className="stopList">
          <h1>Стоп-Лист</h1>
          <div className='stoplistContainer'>
            <div className='stoplistKichen'>
              <h2>Кухня</h2>
              <ul>
                {stopList.map((dish, index) => (
                  <li className='item' key={index}>
                    <span>{dish.dish_name}</span><button className='btn-x'>x</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className='stoplist-bar'>
              <h2>Бар</h2>
              <ul>
                {stopList.map((dish, index) => (
                  <li className='item' key={index}>
                    <span>{dish.dish_name}</span><button className='btn-x'>x</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <h1>Мало</h1>
          <div className='stoplistContainer'>
            <div className='stoplistKichen'>
              <h2>Кухня</h2>
              <ul>
                {fewDishes.map((dish, index) => (
                  <li className='item'>
                    <span>{dish.dish_name}</span><button className='btn-x'>x</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className='stoplist-bar'>
              <h2>Бар</h2>
              <ul>
                {fewDishes.map((dish, index) => (
                  <li className='item'>
                    <span>{dish.dish_name}</span><button className='btn-x'>x</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <h1>Продавати</h1>
          <div className='stoplistContainer'>
            <div className='stoplistKichen'>
              <h2>Кухня</h2>
              <ul>
                {dishesToBeSold.map((dish) => (
                  <li className='item' key={dish.id}>
                    <span>{dish.dish_name}</span><button className='btn-x'>x</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className='stoplist-bar'>
              <h2>Бар</h2>
              <ul>
                {dishesToBeSold.map((dish) => (
                  <li className='item' key={dish.id}>
                    <span>{dish.dish_name}</span><button className='btn-x'>x</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StopList;
