import "./CocktailList.scss";
import { deleteCocktailServer } from "../../utils/cocktail";

export function CocktailsList({ cocktailList, onDeleteCocktail }) {
  return (
    <div className='coctailContainer'>
      <h2>Додані коктейлі</h2>

      <div className="con is-flex is-flex-wrap-wrap">
        {cocktailList.map(cocktail => (
          <div key={cocktail.id} className='coctailList'>
            <details className='btns coctailList__items'>
              <summary className='is-flex  is-justify-content-center'>
                <div className='coctailList__item coctail_name'>

                  <h3>{cocktail.cocktail_name || cocktail.nameCocktail}</h3>
                  <img src={typeof cocktail.img === "string" ? cocktail.img : URL.createObjectURL(cocktail.img)} alt={cocktail.nameCocktail} />

                </div>
                {/* <h3 className='coctailList__item'>&nbsp; &#8680; &nbsp;{cocktail.user}</h3> */}
              </summary>
              <ul>
                <li className='is-flex is-justify-content-space-between	' style={{ marginTop: '20px' }}>
                  <div>id </div>
                  <div>{cocktail.id}</div>
                </li>
                <hr />

                <li className='is-flex is-justify-content-space-between'>
                  <div>Приготування&nbsp;</div>
                  <div>{cocktail.cocktailPreparationMethod}</div>
                </li>

                <hr />

                <li className='is-flex is-justify-content-space-between	'>
                  <div>Бокал&nbsp;</div>
                  <div>{cocktail.glass}</div>
                </li>

                <hr />

                <li className='is-flex is-justify-content-space-between	'>
                  <div>Лід</div>
                  <div>{cocktail.ice}</div>
                </li>

                <hr />

                <li className='is-flex is-justify-content-space-between	'>
                  Інгредієнти:
                </li>
                <hr />
                {cocktail.ingredients.map(ingredient => (
                  <div>
                    <li key={ingredient.ingredient} className='is-flex is-justify-content-space-between	'>
                      <div>{ingredient.ingredient}</div>
                      <div>{ingredient.numberOfMilliliters} мл</div>
                    </li>
                  </div>
                ))}
                <hr />
                <li className='is-flex is-justify-content-space-between	'>
                  Опис:
                  <br />
                  {cocktail.description}
                </li>
                <div className="btn_container">
                  <button
                    type="button"
                    className='btn_dell btn btn_dell-coctail'
                    onClick={() => {
                      onDeleteCocktail(cocktail.id);
                      deleteCocktailServer(cocktail.id)
                    }}
                  >
                    Видалити коктейль
                  </button>
                </div>
              </ul>
            </details>
            {/* </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
