/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import './SearchSelect.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';

// const options = useMemo(() => convertToOptionsSelect(ingredients), [ingredients]);

// const updateOptions = useCallback((options) => {
//   setSearchIngredients(filteredItems(ingredients, options));
// }, [ingredients]);

const SearchSelect = ({ options, updateOptions, placeholder, selectOpen = true, size = 'is-medium', path, onSelect }) => {
  const [selected, setSelected] = useState('');
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(false);
  const [filtredOptions, setFiltredOptions] = useState(options);
  const [selectedOptions, setSelectedOptions] = useState([]);

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

  const handleSelect = (option) => {
    const alreadySelected = selectedOptions.some(selected => selected.id === option.id);
    // console.log(alreadySelected);
    const newSelectedOptions = alreadySelected
      ? selectedOptions.filter(selected => selected.id !== option.id)
      : [...selectedOptions, option];

    setSelectedOptions((prew) => [...prew, option]);
    onSelect(newSelectedOptions);
    // console.log(newSelectedOptions);
  };

  return (
    <div className='searchSelect'>
      <div className="field-search">
        <p className="control has-icons-left has-icons-right">
          <input
            className={`input-search input is-rounded ${size}`}
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
          <span className="iconSearch icon is-small is-left">
            <i className="iconSearch fas fa-search"></i>
          </span>
          {!!selected.length && (
            <button
              type="button"
              className="del"
              onClick={() => { setSelected(''); setToggle(false); updateOptions(options) }}
            >
              <span className="del1 icon delete is-right ">
                <i className='delete is-danger'>

                </i>
              </span>
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


      {selectOpen && <div className={cn('select', 'is-multiple',
        { 'display-none': !filtredOptions.length || !toggle },
        { 'search-select ': toggle }
      )}>
        <select className='search-select' multiple size={filtredOptions.length > 8 ? 8 : filtredOptions.length}>
          {filtredOptions.map(option => (
            <option
              key={option.id}
              value={option.value}
              onClick={() => handleSelect(option)}
              onSelect={() => handleSelect(option)}
            >
              {option.value}
            </option>
          ))}
        </select>
      </div>}
    </div>);
};
export default SearchSelect;
