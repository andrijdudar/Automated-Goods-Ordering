import { create } from "zustand";
import { TAGS } from "./Obgects";

const useStore = create((set) => ({
  titleCategory: 'Всі страви',
  setTitleCategory: (titleCategory) => set({ titleCategory }),

  // dishesFromServer: [],
  // setDishesFromServer: (dishesFromServer) => set({ dishesFromServer }),

  dishes: [],
  setDish: (dish) => set((state) => ({ dishes: { ...state.dishes, ...dish } })),
  setDishes: (dishes) => set({ dishes }),

  dishesCategory: [],
  setDishesCategory: (dishesCategory) => set({ dishesCategory }),

  searchDishes: [],
  setSearchDishes: (searchDishes) => set({ searchDishes }),

  categories: [],
  setCategories: (categories) => set({ categories }),
  setCategory: (category) => set((state) => ({ categories: { ...state.categories, ...category } })),

  tags: TAGS,
  setTag: (tag) => set((state) => ({ tags: { ...state.tags, ...tag } })),

  stopList: [],
  setStopList: (stopList) => set({ stopList }),

  fewDishes: [],
  setFewDishes: (fewDishes) => set({ fewDishes }),


  dish_to_sold: [],
  setDishToSold: (dish_to_sold) => set({ dish_to_sold }),

  ingredients: [],
  setIngredients: (ingredients) => set({ ingredients }),

  premixes: [],
  setPremixes: (premixes) => set({ premixes }),

  providers: [],
  setProviders: (providers) => set({ providers }),

  users: [],
  setUsers: (users) => set({ users }),

  orders: [],
  setOrders: (orders) => set({ orders }),
}));

export default useStore;
