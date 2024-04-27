/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import './SideBar.css';
import { useNavigate } from 'react-router-dom';
import useStore from "../../StoreZustand";
// import { getAllCategories } from '../../utils/fetch';
import SearchSelect from '../SearchSelect/SearchSelect';
import { OBG } from '../../Obgects';


function SideBar() {
  const [activeCategoryIds, setActiveCategoryIds] = useState([]);
  const setDishesCategory = useStore((state) => state.setDishesCategory);
  // const searchDishes = useStore((state) => state.searchDishes);
  const setSearchDishes = useStore((state) => state.setSearchDishes);
  const setCategories = useStore((state) => state.setCategories);
  const setTitleCategory = useStore((state) => state.setTitleCategory);
  const categories = useStore((state) => state.categories);
  const dishesCategory = useStore((state) => state.dishesCategory);
  const dishes = useStore((state) => state.dishes);
  const navigate = useNavigate();

  useEffect(() => {
    // getAllCategories()
    //   .then((data) => {
        // console.log('categories', data);
        // setCategories(data);
        // localStorage.setItem('categories', JSON.stringify(data));
      // }).catch(() => {
        const categoriesLS = JSON.parse(localStorage.getItem('categories'));
        setCategories(categoriesLS);
        console.log('error in getAllCategories in SideBar.jsx');
      // });
  }, []);

  const handleCards = (categoryId, categoryName) => {
    const selectedDishes = dishes.filter(item => item.category_id === categoryId);
    setDishesCategory(selectedDishes);
    setActiveCategoryIds([]);
    setTitleCategory(categoryName);
  }

  const handleMenuDish = (id, child, categoryName) => {
    const isActive = activeCategoryIds.includes(id);
    if (isActive) {
      setActiveCategoryIds(activeCategoryIds.filter(activeId => activeId !== id));
    } else {
      setActiveCategoryIds([...activeCategoryIds, id]);
      if (!child) {
        handleCards(id, categoryName);
      }
    }
  }

  const convertToOptionsSelect = (obg) => {
    const result = obg.map((value) => ({
      id: value.id,
      value: value.dish_name,
    }))
    return result;
  };

  useEffect(() => {
    setSearchDishes(dishesCategory);
    setOptions(convertToOptionsSelect(dishesCategory));
  }, [dishesCategory]);


  const [options, setOptions] = useState(convertToOptionsSelect(dishesCategory));

  const updateOptions = useCallback((options) => {
    const dishCategory = dishesCategory;
    const filteredDishes = dishCategory.filter(dish =>
      options.some(item => item.id === dish.id && item.value === dish.dish_name)
    );
    setSearchDishes(filteredDishes)
  }, [dishesCategory]);

  const renderCategories = (parentId) => {
    return categories.filter(item => item.parent_id === parentId).map(item => (
      <li className="sidebar-item" key={item.id}>
        <button className='btn-aside sidebar-item' onClick={() => handleMenuDish(item.id, item.child, item.name)}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}{' '}{item.lenth}
        </button>
        {activeCategoryIds.includes(item.id) && item.child && (
          <ul className="sidebar-nav">
            {renderCategories(item.id)}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <div id="wrapper">
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li className="sidebar-item item" onClick={() => setDishesCategory(dishes)}>
            Всі страви
          </li>
          {renderCategories(2)}
          <li className="sidebar-item item" onClick={() => navigate('/newdish')}>
            Додати страву
          </li>
          <div className='search'>
            <SearchSelect
              options={options}
              updateOptions={updateOptions}
              placeholder='Пошук страви'
              path='/'
            />
          </div>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
