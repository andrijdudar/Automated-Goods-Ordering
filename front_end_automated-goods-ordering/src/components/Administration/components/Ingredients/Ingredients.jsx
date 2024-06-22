/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getAllIngredients, patchIngredient } from '../../../../utils/fetch';
import './Ingredients.scss';
import SearchSelect from '../../../utils/SearchSelect/SearchSelect';
import { Loaderr } from '../../../utils/Loader/Loaderr';
import useStore from '../../../../StoreZustand';
import { convertToOptionsSelect, filteredItems } from '../../../utils/SearchSelect/SearchUtils';

export function Ingredients() {
  const ingredients = useStore((state) => state.ingredients);
  const setIngredients = useStore((state) => state.setIngredients);
  const updateIngredient = useStore((state) => state.updateIngredient);

  const [searchIngredients, setSearchIngredients] = useState([]);
  const [openDetailId, setOpenDetailId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editIngredient, setEditIngredient] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState();
  const [formData, setFormData] = useState(currentIngredient || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'using' ? (value === true) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      id: formData.id,
      stock_minimum: formData.stock_minimum,
      min_acceptable: formData.min_acceptable,
      stock_maximum: formData.stock_maximum,
      standart_container: formData.standart_container,
      measure: formData.measure,
      using: formData.using,
      provider: {
        id: formData.provider_id || 0
      }
    };
    patchIngredient(dataToSend);
    updateIngredient(dataToSend.id, dataToSend);
    setEditIngredient(false);
  };

  useEffect(() => {
    setLoading(true);
    getAllIngredients()
      .then((res) => {
        setIngredients(res);
        setSearchIngredients(res);
        localStorage.setItem('ingredients', JSON.stringify(res));
      })
      .catch((err) => {
        console.log(err);
        const LS = JSON.parse(localStorage.getItem('ingredients'));
        setIngredients(LS);
        alert('Помилка при завантаженні інгредієнтів');
      })
      .finally(() => {
        console.log('інгредієнти завантажені');
        setLoading(false);
      });
  }, []);

  const options = useMemo(() => convertToOptionsSelect(ingredients), [ingredients]);

  const updateOptions = useCallback((options) => {
    setSearchIngredients(filteredItems(ingredients, options));
  }, [ingredients]);

  const handleToggle = (id) => {
    setOpenDetailId((prevId) => (prevId === id ? null : id));
  };


  return (
    <div className="ingredientsList">
      <h2>Список інгредієнтів</h2>
      <div className='ingredientSearch'>
        <SearchSelect
          options={options}
          updateOptions={updateOptions}
          placeholder='Пошук інгредієнтів...'
          selectOpen={false}
          path='/'
        />
      </div>
      {loading ? (
        <Loaderr />
      ) : (
        <div className='ul'>
          {searchIngredients.map((ingredient) => (
            <details key={ingredient.id}
              className='detailsIngredients'
              open={openDetailId === ingredient.id}
            >
              <summary onClick={(e) => {
                e.preventDefault();
                setCurrentIngredient(ingredient);
                setEditIngredient(false);

                setFormData({
                  ...ingredient,
                  using: ingredient.using ? 'true' : 'false',
                });
                handleToggle(ingredient.id);
              }}>{ingredient.name}</summary>
              {!editIngredient && (
                <ul>
                  <li className='ingredientsLi'><strong>Кількість:</strong>{ingredient.amount}{ingredient.measure}</li>
                  <li className='ingredientsLi'><strong>Сума:</strong> {ingredient.suma}</li>
                  <li className='ingredientsLi'><strong>Мінімальний залишок:</strong> {ingredient.stock_minimum} {ingredient.measure}</li>
                  <li className='ingredientsLi'><strong>Мінімально прийнятний залишок:</strong> {ingredient.min_acceptable} {ingredient.measure}</li>
                  <li className='ingredientsLi'><strong>Максимальний залишок:</strong> {ingredient.stock_maximum} {ingredient.measure}</li>
                  <li className='ingredientsLi'><strong>Стандартний контейнер:</strong> {ingredient.standart_container} {ingredient.measure}</li>
                  <li className='ingredientsLi'><strong>Використовується:</strong> {ingredient.using ? 'Так' : 'Ні'}</li>
                  <li className='ingredientsLi'><strong>Постачальник ID:</strong> {ingredient.provider_id ? ingredient.provider_id : 'Немає'}</li>
                  <button
                    type='button'
                    onClick={() => setEditIngredient(!editIngredient)}
                  >
                    Редагувати
                  </button>
                </ul>
              )}
              {editIngredient && (
                <form onSubmit={handleSubmit}>
                  <ul>
                    <li className='ingredientsLi'>
                      <div><strong>Одиниці вимірювання:</strong></div>
                      <input
                        type='text'
                        name='measure'
                        value={formData.measure}
                        onChange={handleChange}
                      />
                    </li>
                    <li className='ingredientsLi'>
                      <div><strong>Мінімальний залишок:</strong></div>
                      <input
                        type='number'
                        name='stock_minimum'
                        value={formData.stock_minimum}
                        onChange={handleChange}
                        step="0.01"
                      />
                    </li>
                    <li className='ingredientsLi'>
                      <strong>Мінімально прийнятний залишок:</strong>
                      <input
                        type='number'
                        name='min_acceptable'
                        value={formData.min_acceptable}
                        onChange={handleChange}
                        step="0.01"
                      />
                    </li>
                    <li className='ingredientsLi'>
                      <strong>Максимальний залишок:</strong>
                      <input
                        type='number'
                        name='stock_maximum'
                        value={formData.stock_maximum}
                        onChange={handleChange}
                        step="0.01"
                      />
                    </li>
                    <li className='ingredientsLi'>
                      <strong>Стандартний контейнер:</strong>
                      <input
                        type='number'
                        name='standart_container'
                        value={formData.standart_container}
                        onChange={handleChange}
                        step="0.01"
                      />
                    </li>
                    <li className='ingredientsLi'>
                      <strong>Використовується:</strong>
                      <select
                        name='using'
                        value={formData.using}
                        onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'using', value: e.target.value === 'true' } })}
                      >
                        <option value='true'>Так</option>
                        <option value='false'>Ні</option>
                      </select>

                    </li>
                    <li className='ingredientsLi'>
                      <strong>Постачальник ID:</strong>
                      <input
                        type='number'
                        name='provider_id'
                        value={formData.provider_id || ""}
                        onChange={handleChange}
                      />
                    </li>
                  </ul>
                  <button type='submit'>Відправити</button>
                </form>
              )}
            </details>
          ))}
        </div>)
      }
    </div>
  );
}
