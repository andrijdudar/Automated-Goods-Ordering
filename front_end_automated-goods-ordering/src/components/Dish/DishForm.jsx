import React, { useState } from 'react';
import './../cocktails/CocktailForm.scss';
import cn from 'classnames';
import './DishForm.css';
import { SERVER_URL } from '../../services/httpClient';


// import Icon from '@mdi/react';
// import { mdicategorysCocktail } from '@mdi/js';
// import shakerIcon from '../../img/ShakerIcon.svg';
// import { addCocktailServer } from '../../utils/cocktail';


export function DishForm() {

  // #region  state
  const [author, setAuthor] = useState('Автор');
  // const [hesErrorAuthor, setHesErrorAuthor] = useState(false);

  const [nameDish, setNameDish] = useState('');
  const [hesErrorNameDish, setHesErrorNameDish] = useState(false);

  const [photo, setPhoto] = useState('');

  const [category, setcategory] = useState('Посуд');
  const [hesErrorСategory, sethesErrorСategory] = useState(false);

  const [tags, settags] = useState('Приготування');
  // const [hesErrorTags, sethesErrorTags] = useState(false);

  const [ice, setIce] = useState('Лід');
  // const [hesErrorIce, setHesErrorIce] = useState(false);

  const [ingredients, setIngredients] = useState([{ ingredient: '', amount: '' }]);
  const [hesErrorIngredients, setHesErrorIngredients] = useState(false);

  const [description, setDescription] = useState('');
  const [hesErrorDescription, setHesErrorDescription] = useState(false);
  // #endregion


  //#region  handle

  const handleNameDishChange = (event) => {
    setNameDish(event.target.value);
    setHesErrorNameDish(false);
  };

  const handlePhoto = (event) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setPhoto(file);
      // Тут ви можете виконати додаткові дії з обраним файлом
    }
  };

  const handleСategoryChange = (event) => {
    setcategory(event.target.value);
    sethesErrorСategory(false);
  };

  // const handleTagsChange = (event) => {
  //   settags(event.target.value);
  //   sethesErrorTags(false);
  // };

  // const handleIceChange = (event) => {
  //   setIce(event.target.value);
  //   setHesErrorIce(false);
  // };

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

  const makeCocktail = () => {
    // const cocktail = {
    //   "id": cocktailList.length + 1,
    //   "user": author,
    //   "nameDish": nameDish,
    //   "photo": photo,
    //   "categorys": category,
    //   "cocktailtagsMethod": tags,
    //   "ice": ice,
    //   "ingredients": [...ingredients],
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
    setAuthor('Автор');
    setNameDish('');
    setPhoto('');
    setcategory('Посуд');
    settags('Приготування');
    setIce('Лід');
    setIngredients([{ ingredient: '', amount: '' }]);
    setDescription('');

    // setHesErrorAuthor(false);
    setHesErrorNameDish(false);
    sethesErrorСategory(false);
    // sethesErrorTags(false);
    // setHesErrorIce(false);
    setHesErrorIngredients(false);
    setHesErrorDescription(false);
  };


  const hendleSubmit = (event) => {
    event.preventDefault();
    const cocktail = makeCocktail();

    const checkError = (input, valuee) => {
      if (!input || input === valuee) {
        return true;
      }
      return false;
    };

    if (!author || !nameDish || !category || !tags || !ice || !description || ingredients.some(item => !item.ingredient || !item.amount)) {
      // setHesErrorAuthor(checkError(author, 'Автор'));
      setHesErrorNameDish(checkError(nameDish));
      sethesErrorСategory(checkError(category, 'Посуд'));
      // sethesErrorTags(checkError(tags, 'Приготування'));
      // setHesErrorIce(checkError(ice, 'Лід'));

      setHesErrorIngredients(() => {
        const hasEmptyValue = ingredients.some(item => item.ingredient === '' || item.amount === '');
        return hasEmptyValue;
      });

      setHesErrorDescription(checkError(description));
      return;
    }

    reset();
  }


  return (
    <div className='container'>
      <form
        onSubmit={hendleSubmit}
        onReset={reset}
        action={SERVER_URL}
        method="POST"
        className='form-container section is-flex is-flex
        -direction-column'
      >
        <div className="control field is-flex is-flex-direction-column ">
          <div>
            <label className="label has-text-white"><p className='title name-cocktail-title'>Назва страви</p></label>
            <div className={cn("control",
              { 'is-danger': hesErrorNameDish })}>
              <input
                value={nameDish}
                name='nameDish'
                className="input name-cocktail is-rounded"
                type="text"
                onChange={handleNameDishChange}
              />

            </div>
            {hesErrorNameDish && (
              <p className='eror'>&#8593;! Як блядь страва називається !&#8593;</p>
            )}
          </div>

          <div className="file is-medium is-boxed ">
            <label className="file-label">
              <input
                className="file file-input"
                type="file"
                name="resume"
                onChange={handlePhoto}
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
            { 'is-danger': hesErrorСategory })}>
            <div className="select  is-medium is-rounded">
              <select
                value={category}
                name='category'
                onChange={handleСategoryChange}
              >
                <option> <input
                  value={nameDish}
                  name='nameDish'
                  className="input name-cocktail is-rounded"
                  type="text"
                  onChange={handleNameDishChange}
                /></option>
                <option>Категорія страви</option>
                <option>Стейк</option>
                <option>Салат</option>
                <option>Гаряча страва</option>
                <option>Десерт</option>
                <option>...</option>
              </select>

              {hesErrorСategory && (
                <p className='eror'>&#8593;! До якої категорії відноситься страва !&#8593;</p>
              )}
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
                  />
                  {hesErrorIngredients && !input.ingredient && (
                    <p className='eror'>&#8593; ! Пропущено інгредієнт !&#8593;</p>
                  )}
                </div>

                <div className="field">
                  {index <= 0 && (
                    <label className="label has-text-white">гр/мл</label>
                  )}
                  <input
                    className={cn("input input-ml is-rounded",
                      { 'is-danger': hesErrorIngredients && !input.amount })}
                    type="text"
                    name="amount"
                    value={input.amount}
                    onChange={(event) => handleIngredientsChange(index, event)}
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

          <div className='is-flex is-flex-direction-column'>
            <div>
              <label className="checkbox">
                <input type="checkbox" />
                Remember me
              </label>
            </div>
            <div>
              <label className="checkbox">
                <input type="checkbox" />
                Remember me
              </label>
            </div>
            <div>
              <label className="checkbox">
                <input type="checkbox" checked />
                Remember me
              </label>
            </div>
            <button>Додати тег</button>
            <div>
              <input type="text" />
              <button>Зберегти</button>
            </div>
          </div>

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

        <div className="">
          Ціна: <input type="text" />
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
    </div>
  );
}
