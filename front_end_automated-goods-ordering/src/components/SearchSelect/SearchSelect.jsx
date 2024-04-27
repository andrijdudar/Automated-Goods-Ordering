/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import './SearchSelect.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';


// useEffect(() => {
//   setSearchDishes(dishesCategory);
//   setOptions(convertToOptionsSelect(dishesCategory));
// }, [dishesCategory]);


// const [options, setOptions] = useState(convertToOptionsSelect(dishesCategory));

// const updateOptions = useCallback((options) => {
//   const dishCategory = dishesCategory;
//   const filteredDishes = dishCategory.filter(dish =>
//     options.some(item => item.id === dish.id && item.value === dish.dish_name)
//   );
//   setSearchDishes(filteredDishes)
// }, [dishesCategory]);

const SearchSelect = ({ options, updateOptions, placeholder, path }) => {
  const [selected, setSelected] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(false);
  const [filtredOptions, setFiltredOptions] = useState(options);

  const handleInput = (event) => {
    if (toggle === false) {
      setToggle(true);
    }
    setSelected(event.target.value);
    const filteredOptions = options.filter((value) => value.value.toLowerCase().includes(event.target.value.toLowerCase()));
    setFiltredOptions(filteredOptions);
    updateOptions(filteredOptions);

    if (filteredOptions.length === 0) {
      setError(true);

      const wait = setTimeout(() => {
        setError(false);
        clearTimeout(wait);
      }, 10000);
    } else {
      setError(false);
    }
  }

  // const handleSelect = (event) => {
  //   setSelected(event.target.value);
  //   setToggle(false);
  // };

  return (
    <div className='searchSelect'>
      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input
            className="input is-rounded is-medium"
            type="text"
            value={selected}
            placeholder={placeholder}
            onFocus={(event) => handleInput(event)}
            onChange={(event) => handleInput(event)}
            onBlur={() => {
              const wait = setTimeout(() => {
                setToggle(false);
                clearTimeout(wait);
              }, 200);
            }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-search"></i>
          </span>
          {!toggle ? (
            <span className="icon icon-select is-right">
              <i>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor" />
                </svg>
              </i>
            </span>
          ) : (
            <button
              type="button"
              className="button del is-small is-rounded is-danger"
              onClick={() => { setSelected(''); setToggle(false) }}
            >
              x
            </button>
          )}
        </p>
      </div>

      {error && (
        <p className="help is-danger is-size-6">
          Такого значення не знайдено
          <Link to={path} type='button' className='button is-small is-danger'>
            Добавити нове
          </Link>
        </p>
      )}


      <div className={cn('select', 'is-multiple',
        { 'display-none': !filtredOptions.length || !toggle },
      )}>
        <select multiple size={filtredOptions.length > 8 ? 8 : filtredOptions.length}>
          {filtredOptions.map(value => (
            <option
              key={value.id}
              value={value.dish_name}
              onClick={(event) => handleInput(event)}
              onSelect={(event) => handleInput(event)}
            >
              {value.value}
            </option>
          ))}
        </select>
      </div>
    </div>);
};
export default SearchSelect;
