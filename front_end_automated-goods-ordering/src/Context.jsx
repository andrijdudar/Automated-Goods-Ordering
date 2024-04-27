import { createContext, useContext, useState } from "react";
import { ALLDISHES, OBG, TAGS } from "./Obgects";


// const getLocalStorege = () => {
//   const storedTodos = localStorage.getItem('todos');

//   return {
//     ...initialState,
//     todos: storedTodos ? JSON.parse(storedTodos) : [],
//   };
// };

export const AppContext = createContext([]);


export const Context = ({ children }) => {

  const [state, setState] = useState({
    titleCategory: '',
    allDishes: ALLDISHES,
    dishes: ALLDISHES,
    categories: OBG,
    tags: TAGS,
    stopList: [],
    dish_to_sold: [],
    ingredients: [],
    premixes: [],
    providers: [],
    users: [],
    orders: [],
  });


  //   // localStorage.setItem('categoriesCocktail', JSON.stringify(categoriesCocktail));
  //   // localStorage.setItem('menu', JSON.stringify(menu));
  //   // localStorage.setItem('menuCocktail', JSON.stringify(menuCocktail));
  //   // localStorage.setItem('stopListToggle', JSON.stringify(stopListToggle));
  //   localStorage.setItem('categories', JSON.stringify(categories));
  //   localStorage.setItem('dishes', JSON.stringify(dishes));
  //   localStorage.setItem('tags', JSON.stringify(dishes));
  //   setState({
  //     ...state,
      // stopListToggle: JSON.parse(localStorage.getItem('stopListToggle')),
  //     // menuToggle: JSON.parse(localStorage.getItem('menuToggle')),
  //     // cocktailsToggle: JSON.parse(localStorage.getItem('cocktailsToggle')),
  //     // dishFormToggle: JSON.parse(localStorage.getItem('dishFormToggle')),
  //     // menuCardsToggle: JSON.parse(localStorage.getItem('menuCardsToggle')),
  //     // burgerMenuToggle: JSON.parse(localStorage.getItem('burgerMenuToggle')),
  //     allCategories: categories,
  //     allDishes: dishes,
  //     allTags: tags,
  //   });

  //   console.log('всі категорії', state.allCategories);
  //   console.log('всі страви',state.allDishes);
  //   console.log('всі теги',state.allTags);
  // }, []);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(AppContext);
};
