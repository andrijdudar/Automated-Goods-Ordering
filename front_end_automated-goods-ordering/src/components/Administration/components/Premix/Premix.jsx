/* eslint-disable react-hooks/exhaustive-deps */
// import { useStore } from 'zustand';
import useStore from '../../../../StoreZustand';
import { createPremix, getAllIngredients, getAllPremixes } from '../../../../utils/fetch';
import { Loaderr } from '../../../utils/Loader/Loaderr';
import SearchSelect from '../../../utils/SearchSelect/SearchSelect';
import { convertToOptionsSelect, filteredItems } from '../../../utils/SearchSelect/SearchUtils';
import './Premix.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function Premix() {
  const premixes = useStore((state) => state.premixes);
  const setPremixes = useStore((state) => state.setPremixes);
  const updatePremix = useStore((state) => state.updatePremix);
  const [searchPremixes, setsearchPremixes] = useState([]);
  const [editPremix, setEditPremix] = useState(false);
  const [currentPremix, setCurrentPremix] = useState();

  const [ingredients, setIngredients] = useState([]);
  const [searchIngredients, setSearchIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [openDetailId, setOpenDetailId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(currentPremix || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'using' ? (value === true) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };




  const handleIngredientQuantityChange = (ingredientId, quantity) => {
    setSelectedIngredients(prevSelected => prevSelected.map(ingredient =>
      ingredient.ingredient.id === ingredientId ? { ...ingredient, quantity } : ingredient
    ));
  };

  const handleIngredientSelect = (selectedIngredients) => {
    // console.log(selectedIngredients);
    const newSelectedIngredients = selectedIngredients.map((option) => ({
      ingredient: {
        id: option.id,
        name: option.value,
        measure: option.measure
      },
      quantity: 1 // Default quantity
    }));
    console.log(newSelectedIngredients);
    setSelectedIngredients(newSelectedIngredients);
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      name: formData.name,
      ingredients: selectedIngredients.map(ingredient => ({
        id: ingredient.ingredient.id,
        name: ingredient.ingredient.name,
        quantity: ingredient.quantity || 5,
      })),
      description: formData.description,


      // id: formData.id,
      // name: formData.name,
      // description: formData.description,
      // premix_ingredients: selectedIngredients.map(ingredient => ({
      //   ingredient_id: ingredient.ingredient.id,
      //   quantity: ingredient.quantity || 5,
      //   ingredient: {
      //     name: ingredient.ingredient.name,
      //     measure: ingredient.measure || 'кг'
      //   }
      // }))


      // name: formData.name,
      // description: formData.description,
      // premix_ingredients: selectedIngredients.map(premix_ingredient => ({
      //   ingredient_id: premix_ingredient.ingredient.id,
      //   quantity: premix_ingredient.quantity,
      //   ingredient: {
      //     name: premix_ingredient.ingredient.name,
      //     measure: premix_ingredient.ingredient.measure
      //   }
      // }))
    };
    console.log(dataToSend);
    createPremix(dataToSend);
    updatePremix(dataToSend.id, dataToSend);
    setEditPremix(false);
  };

  useEffect(() => {
    setLoading(true);
    getAllPremixes()
      .then((res) => {
        setPremixes(res);

        setsearchPremixes(res);
        // localStorage.setItem('premixes', JSON.stringify(res));
      })
      .catch((err) => {
        // console.log(err);
        // const LS = JSON.parse(localStorage.getItem('premixes'));
        // setPremixes(LS);
        // alert('Помилка при завантаженні преміксів');
      })
      .finally(() => {
        console.log('премікси завантажені');
        setLoading(false);
      });
  }, []);

  const options = useMemo(() => convertToOptionsSelect(premixes), [premixes]);

  const updateOptions = useCallback((options) => {
    setsearchPremixes(filteredItems(premixes, options));
  }, [premixes]);

  const optionsForm = useMemo(() => convertToOptionsSelect(ingredients), [ingredients]);

  const updateOptionsForm = useCallback((options) => {
    setSearchIngredients(filteredItems(ingredients, optionsForm));
    console.log(searchIngredients);
  }, [ingredients]);


  const handleToggle = (id) => {
    setOpenDetailId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="premixList">
      <h2>Список преміксів</h2>
      <div className='premixSearch'>
        <SearchSelect
          options={options}
          updateOptions={updateOptions}
          placeholder='Пошук преміксів...'
          selectOpen={false}
          path='/'
        />
      </div>
      {loading ? (
        <Loaderr />
      ) : (
        <ul className="ul">
          {searchPremixes.map((premix) => (
            <li key={premix.id} className="premixItem">
              <details
                className="detailsPremix"
                open={openDetailId === premix.id}
              >
                <summary
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPremix(premix);
                    setEditPremix(false);
                    setFormData(premix);
                    handleToggle(premix.id)
                  }}
                >
                  {premix.name}
                </summary>
                {!editPremix ? (
                  <div>
                    <strong>Опис:</strong>
                    <p>{premix.description}</p>
                    <ul>
                      <strong>Інгредієнти:</strong>
                      {premix.premix_ingredients.map((premix_ingredient) => (
                        <li key={premix_ingredient.ingredient_id} className="premixLi">
                          <strong>{premix_ingredient.ingredient.name}:</strong> {premix_ingredient.quantity} {premix_ingredient.ingredient.measure}
                        </li>
                      ))}
                    </ul>

                    <button
                      type='button'
                      onClick={() => {
                        setEditPremix(!editPremix);
                        getAllIngredients().then((res) => {
                          setIngredients(res);
                        });
                      }}
                    >
                      Редагувати
                    </button>
                  </div>
                ) : (
                  // <form onSubmit={handleSubmit}>
                  //   <p><strong>Опис:</strong>
                  //     <textarea
                  //       style={{ width: '90%', height: '50px', padding: '5px', borderRadius: '15px', background: 'var(--colorTextOrangeHover)' }}
                  //       type='textar'
                  //       name='description'
                  //       value={formData.description}
                  //       onChange={handleChange}
                  //     ></textarea>
                  //   </p>
                  //   <ul>
                  //     <strong>Інгредієнти:</strong>
                  //     <div className='searchPremixIngredient'>
                  //       <SearchSelect
                  //         options={optionsForm}
                  //         updateOptions={updateOptionsForm}
                  //         placeholder='Пошук інгредієнтів...'
                  //         selectOpen={true}
                  //         size='is-small'
                  //         path='/'
                  //       />
                  //     </div>

                  //     {premix.premix_ingredients.map((premix_ingredient) => (
                  //       <li key={premix_ingredient.ingredient_id} className="premixLi">
                  //         <strong>
                  //           {premix_ingredient.ingredient.name}:
                  //         </strong> {premix_ingredient.quantity} {premix_ingredient.ingredient.measure}
                  //       </li>
                  //     ))}
                  //   </ul>
                  //   <button type='submit'>Відправити</button>
                  // </form>
                  <form onSubmit={handleSubmit}>
                    <div className='field'>
                      <label className='label'>Назва:</label>
                      <div className='control'>
                        <input
                          type="text"
                          name="name"
                          className="input"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='field'>
                      <label className='label'>Опис:</label>
                      <div className='control'>
                        <textarea
                          name="description"
                          className="textarea"
                          value={formData.description}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='field'>
                      <label className='label'>Інгредієнти:</label>
                      <SearchSelect
                        options={optionsForm}
                        updateOptions={updateOptionsForm}
                        placeholder='Пошук інгредієнтів...'
                        selectOpen={true}
                        path='/'
                        onSelect={handleIngredientSelect}
                      />
                      {selectedIngredients.map(ingredient => (
                        <div key={ingredient.ingredient.id} className='field'>
                          <label className='label'>{ingredient.ingredient.name} - {ingredient.ingredient.measure}</label>
                          <div className='control'>
                            <input
                              type="number"
                              className="input"
                              value={ingredient.quantity}
                              onChange={(e) => handleIngredientQuantityChange(ingredient.ingredient.id, parseFloat(e.target.value))}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <button type="submit" className='button is-primary'>Відправити</button>
                  </form>
                )}
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
    // <div className="premixesList">
    //   <h2>Список інгредієнтів</h2>
    //   <div className='premixesearch'>
    //     <SearchSelect
    //       options={options}
    //       updateOptions={updateOptions}
    //       placeholder='Пошук преміксів...'
    //       selectOpen={false}
    //       path='/'
    //     />
    //   </div>
    //   {loading ? (
    //     <Loaderr />
    //   ) : (
    //     <div className='ul'>
    //       {searchPremixes.map((premix) => (
    //         <details key={premix.id}
    //           className='detailsPremixes'
    //           open={openDetailId === premix.id}
    //         >
    //           <summary onClick={(e) => {
    //             e.preventDefault();
    //             setCurrentPremix(premix);
    //             setEditPremix(false);

    //             setFormData({
    //               ...premix,
    //               using: premix.using ? 'true' : 'false',
    //             });
    //             handleToggle(premix.id);
    //           }}>{premix.name}</summary>
    //           {!editPremix && (
    //             <ul>
    //               <li className='premixesLi'><strong>Кількість:</strong>{premix.amount}{premix.measure}</li>
    //               <li className='premixesLi'><strong>Сума:</strong> {premix.suma}</li>
    //               <li className='premixesLi'><strong>Мінімальний залишок:</strong> {premix.stock_minimum} {premix.measure}</li>
    //               <li className='premixesLi'><strong>Мінімально прийнятний залишок:</strong> {premix.min_acceptable} {premix.measure}</li>
    //               <li className='premixesLi'><strong>Максимальний залишок:</strong> {premix.stock_maximum} {premix.measure}</li>
    //               <li className='premixesLi'><strong>Стандартний контейнер:</strong> {premix.standart_container} {premix.measure}</li>
    //               <li className='premixesLi'><strong>Використовується:</strong> {premix.using ? 'Так' : 'Ні'}</li>
    //               <li className='premixesLi'><strong>Постачальник ID:</strong> {premix.provider_id ? premix.provider_id : 'Немає'}</li>
    //               <button
    //                 type='button'
    //                 onClick={() => setEditPremix(!editPremix)}
    //               >
    //                 Редагувати
    //               </button>
    //             </ul>
    //           )}
    //           {editPremix && (
    //             <form onSubmit={handleSubmit}>
    //               <ul>

    //                 <li className='premixesLi'>
    //                   <div><strong>Одиниці вимірювання:</strong></div>
    //                   <input
    //                     type='text'
    //                     name='measure'
    //                     value={formData.measure}
    //                     onChange={handleChange}
    //                   />
    //                 </li>
    //                 <li className='premixesLi'>
    //                   <div><strong>Мінімальний залишок:</strong></div>
    //                   <input
    //                     type='number'
    //                     name='stock_minimum'
    //                     value={formData.stock_minimum}
    //                     onChange={handleChange}
    //                     step="0.01"
    //                   />
    //                 </li>
    //                 <li className='premixesLi'>
    //                   <strong>Мінімально прийнятний залишок:</strong>
    //                   <input
    //                     type='number'
    //                     name='min_acceptable'
    //                     value={formData.min_acceptable}
    //                     onChange={handleChange}
    //                     step="0.01"
    //                   />
    //                 </li>
    //                 <li className='premixesLi'>
    //                   <strong>Максимальний залишок:</strong>
    //                   <input
    //                     type='number'
    //                     name='stock_maximum'
    //                     value={formData.stock_maximum}
    //                     onChange={handleChange}
    //                     step="0.01"
    //                   />
    //                 </li>
    //                 <li className='premixesLi'>
    //                   <strong>Стандартний контейнер:</strong>
    //                   <input
    //                     type='number'
    //                     name='standart_container'
    //                     value={formData.standart_container}
    //                     onChange={handleChange}
    //                     step="0.01"
    //                   />
    //                 </li>
    //                 <li className='premixesLi'>
    //                   <strong>Використовується:</strong>
    //                   <select
    //                     name='using'
    //                     value={formData.using}
    //                     onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'using', value: e.target.value === 'true' } })}
    //                   >
    //                     <option value='true'>Так</option>
    //                     <option value='false'>Ні</option>
    //                   </select>

    //                 </li>
    //                 <li className='premixesLi'>
    //                   <strong>Постачальник ID:</strong>
    //                   <input
    //                     type='number'
    //                     name='provider_id'
    //                     value={formData.provider_id || ""}
    //                     onChange={handleChange}
    //                   />
    //                 </li>
    //               </ul>
    //               <button type='submit'>Відправити</button>
    //             </form>
    //           )}
    //         </details>
    //       ))}
    //     </div>)
    //   }
    // </div>
  );
}
