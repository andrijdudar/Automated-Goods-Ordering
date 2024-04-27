import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { AppContext, useMyContext } from '../../Context';


export const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [appliedValue, setAppliedValue] = useState('');
  const { state, setState } = useMyContext(AppContext);
  const { dishes } = state;

  useEffect(() => {
    if (appliedValue !== '') {
      setState({
        ...state,
        dishes: dishes.filter(
          dish => dish.dish_name.toLowerCase().includes(
            appliedValue.toLowerCase(),
          ),
        ),
      });
    }
  }, [appliedValue, state, setState, dishes]);

  const applyValue = debounce(
    (value) => {
      setAppliedValue(value);
    }, 1000,
  );

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    applyValue(value);
  };


  return (
      <div className="dropdown-trigger">
        <input
          type="text"
          value={inputValue}
          placeholder="Введіть частину назви"
          className="input"
          onChange={(e) => handleInputChange(e)}
        />
      </div>
  );
};
