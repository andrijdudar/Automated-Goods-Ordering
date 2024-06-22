import React, { useState } from 'react';
import './CocktailForm.scss';

import Icon from '@mdi/react';
import { mdiGlassCocktail } from '@mdi/js';
import cn from 'classnames';
import { SERVER_URL } from '../../services/httpClient';
import SearchSelect from '../utils/SearchSelect/SearchSelect';


export function CocktailForm({ cocktailList, setCocktailList }) {
  const categories = JSON.parse(localStorage.getItem('categories'));
  console.log('categories', categories);
  const options = categories.map((value) => ({
    id: value.id,
    value: value.name,
  }));
  // #region  state
  const [nameCocktail, setNameCocktail] = useState('');
  const [hesErrorNameCocktail, setHesErrorNameCocktail] = useState(false);

  const [photo, setPhoto] = useState('');

  const [glas, setGlas] = useState('Посуд');
  const [hesErrorGlas, setHesErrorGlas] = useState(false);

  const [preparation, setPreparation] = useState('Приготування');
  const [hesErrorPreparation, setHesErrorPreparation] = useState(false);

  const [ice, setIce] = useState('Лід');
  const [hesErrorIce, setHesErrorIce] = useState(false);

  const [ingredients, setIngredients] = useState([{ ingredient: '', amount: '' }]);
  const [hesErrorIngredients, setHesErrorIngredients] = useState(false);

  const [description, setDescription] = useState('');
  const [hesErrorDescription, setHesErrorDescription] = useState(false);
  // #endregion


  //#region  handle

  const handleNameCocktailChange = (event) => {
    setNameCocktail(event.target.value);
    setHesErrorNameCocktail(false);
  };

  const handlePhoto = (event) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setPhoto(file);
      // Тут ви можете виконати додаткові дії з обраним файлом
    }
  };

  const handleGlasChange = (event) => {
    setGlas(event.target.value);
    setHesErrorGlas(false);
  };

  const handlePreparationChange = (event) => {
    setPreparation(event.target.value);
    setHesErrorPreparation(false);
  };

  const handleIceChange = (event) => {
    setIce(event.target.value);
    setHesErrorIce(false);
  };

  const handleIngredientsChange = (index, event) => {
    const { name, value } = event.target;
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][name] = value;
    setIngredients(updatedIngredients);
    setHesErrorIngredients(false);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setHesErrorDescription(false);
  };

  //#endregion

  // #region func input
  const addInput = (event) => {
    event.preventDefault();

    setIngredients([...ingredients, { ingredient: '', amount: '' }]);
  };


  const removeInput = (index, event) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };
  //#endregion

  const joinIngredients = () => {
    const ingredientsArr = ingredients.map((item) => {
      return `${item.ingredient} - ${item.amount} мл`;
    });
    return ingredientsArr.join(', ');
  };
  const makeCocktail = () => {
    // const cocktail = {
    //   "id": cocktailList.length + 1,
    //   "user": author,
    //   "nameCocktail": nameCocktail,
    //   "photo": photo,
    //   "glass": glas,
    //   "cocktailPreparationMethod": preparation,
    //   "ice": ice,
    //   "ingredients": joinIngredients(),
    //   "description": description
    // }
    const dish = {
      // dish_name: str
      // description: str
      // ingredients: str
      // tags: list[str]
      // category: str(можна вибрати зі списку)
      // price: int
      // file: UploadFile = File()
    }
    return dish;
  };

  const reset = () => {
    setNameCocktail('');
    setPhoto('');
    setGlas('Посуд');
    setPreparation('Приготування');
    setIce('Лід');
    setIngredients([{ ingredient: '', amount: '' }]);
    setDescription('');

    setHesErrorNameCocktail(false);
    setHesErrorGlas(false);
    setHesErrorPreparation(false);
    setHesErrorIce(false);
    setHesErrorIngredients(false);
    setHesErrorDescription(false);
  };


  const hendleSubmit = (event) => {
    event.preventDefault();
    const cocktail = makeCocktail();

    console.log(joinIngredients());
    const checkError = (input, valuee) => {
      if (!input || input === valuee) {
        return true;
      }
      return false;
    };

    if (!nameCocktail || !glas || !preparation || !ice || !description || ingredients.some(item => !item.ingredient || !item.amount)) {
      setHesErrorNameCocktail(checkError(nameCocktail));
      setHesErrorGlas(checkError(glas, 'Посуд'));
      setHesErrorPreparation(checkError(preparation, 'Приготування'));
      setHesErrorIce(checkError(ice, 'Лід'));

      setHesErrorIngredients(() => {
        const hasEmptyValue = ingredients.some(item => item.ingredient === '' || item.amount === '');
        return hasEmptyValue;
      });

      setHesErrorDescription(checkError(description));
      return;
    }
    setCocktailList([
      ...cocktailList,
      cocktail,
    ])
    // Відправте POST-запит на сервер
    // addCocktailServer(cocktail);

    reset();
  };

  return (
    <form
      onSubmit={hendleSubmit}
      onReset={reset}
      action={SERVER_URL}
      method="POST"
      className='form-container section is-flex is-flex
      -direction-column'
    >
      <SearchSelect options={options} placeholder='Categories' path='/menu' />
      {/* Назва коктейля, посуд, Приготування, Лід */}
      <div className="control field is-flex is-flex-direction-column ">
        <div>
          <label className="label has-text-white"><p className='title name-cocktail-title'>Назва Коктейля</p></label>
          <div className={cn("control",
            { 'is-danger': hesErrorNameCocktail })}>
            <input
              value={nameCocktail}
              name='NameCocktail'
              className="input name-cocktail is-rounded"
              type="text"
              placeholder="Negroni"
              onChange={handleNameCocktailChange}
            />

          </div>
          {hesErrorNameCocktail && (
            <p className='eror'>&#8593;! Як блядь коктейль називається !&#8593;</p>
          )}
        </div>

        <div className="file is-medium is-boxed ">
          <label className="file-label">
            <input
              className="file file-input"
              type="file"
              name="resume"
              onChange={handlePhoto}
            // hidden
            />
            {photo && (
              <div>
                <img className='photo' src={URL.createObjectURL(photo)} alt="Картинка" />
              </div>
            )}
            {!photo &&
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">
                  Фото
                </span>
              </span>}
          </label>
        </div>

        <div className={cn("control has-icons-left",
          { 'is-danger': hesErrorGlas })}>
          <div className="select  is-medium is-rounded">
            <select
              value={glas}
              name='Glas'
              onChange={handleGlasChange}
            >
              <option disabled>Посуд</option>
              <option>Олд Фешн</option>
              <option>Шале</option>
              <option>Хайбол</option>
              <option>Винний бокал</option>
            </select>
            {hesErrorGlas && (
              <p className='eror'>&#8593;! Мені його шо в чайнику подавати !&#8593;</p>
            )}
          </div>
          <span className="icon is-left">
            <Icon path={mdiGlassCocktail}
              title="mdiGlassCocktail"
              size={1}
              color="black"
            />
          </span>
        </div>

        <div className={cn("control has-icons-left",
          { 'is-danger': hesErrorPreparation })}>
          <div className="select  is-medium is-rounded">
            <select value={preparation} name='Preparation ' onChange={handlePreparationChange}>
              <option disabled >Приготування</option>
              <option>Шейк</option>
              <option>Стір</option>
              <option>Білд</option>
              <option>Фроулинг</option>
              <option>Бленд</option>
            </select>
            {hesErrorPreparation && (
              <p className='eror'>&#8593;! Яким курва методом його готувати !&#8593;</p>
            )}
          </div>
        </div>

        <div className={cn("control has-icons-left",
          { 'is-danger': hesErrorIce })}>
          <div className="select is-rounded is-medium">
            <select value={ice} name='Ice' onChange={handleIceChange}>
              <option disabled >Лід</option>
              <option>Кубик</option>
              <option>Глиба</option>
              <option>Без льоду</option>
            </select>
            {hesErrorIce && (
              <p className='eror'>&#8593;! Його шо кіп'ятком залити йомайо !&#8593;</p>
            )}
          </div>
          <span className="icon is-large is-left">
            <i className="fas">&#129482;</i>
          </span>
        </div>
      </div>

      {/* Списокк інгедієнтів та об'єм */}
      {ingredients.map((input, index) => (
        <div key={index} className="ingredient is-flex is-flex-direction-row is-justify-content-flex-start">
          <div className='is-flex is-flex-direction-row '>
            <div className="field">
              {index === 0 && (
                <label className="label has-text-white">Інгредієнт</label>
              )}
              <input
                className={cn("input input-in collapse is-rounded",
                  { 'is-danger': hesErrorIngredients && !input.ingredient })}
                type="text"
                name="ingredient"
                value={input.ingredient}
                onChange={(event) => handleIngredientsChange(index, event)}
                placeholder="Джин"
              />
              {hesErrorIngredients && !input.ingredient && (
                <p className='eror'>&#8593; !Шо наливати !&#8593;</p>
              )}
            </div>


            <div className="field">
              {index <= 0 && (
                <label className="label has-text-white">мл/гр</label>
              )}
              <input
                className={cn("input input-ml is-rounded",
                  { 'is-danger': hesErrorIngredients && !input.amount })}
                type="text"
                name="amount"
                value={input.amount}
                onChange={(event) => handleIngredientsChange(index, event)}
                placeholder="30"
              />
              {hesErrorIngredients && !input.amount && (
                <p className='eror'>&#8593; &#128545; &#8593;</p>
              )}
            </div>
          </div>
          {index > 0 ? (
            <button type="button" className='btn deleteInput btn_dell' onClick={() => removeInput(index)}>&times;</button>
          ) : (
            <button type="button" className='btn deleteInput disabled' onClick={() => removeInput(index)} disabled>&times;</button>
          )}
        </div>
      ))
      }

      {/* Кнопка додавання  інпуту */}
      <div className='btn-container'>
        <button className="btn btn_add" onClick={addInput}>
          +
        </button>
      </div>

      {/* Опис*/}
      <div>
        <p>Опис:</p>
        <textarea
          value={description}
          name='Description'
          className={cn("textarea is-large",
            { 'is-danger': hesErrorDescription })}
          placeholder="Опис коктейля"
          onChange={handleDescriptionChange}
        ></textarea>
        {hesErrorDescription && (
          <p className='eror'>&#8593;! Та шось бляха напиши про нього !&#8593;</p>
        )}
      </div>

      {/* Кнопки готово і скасувати */}
      <div className="btn-container">
        <div className="control">
          <button
            type='submit'
            className="btn_done btn_add"
            onClick={hendleSubmit}
          >
            Готово
          </button>
        </div>

        <div className="control">
          <button type='reset' className="btn_cencel btn_dell">
            Скасувати
          </button>
        </div>
      </div>
    </form >
  );
}
