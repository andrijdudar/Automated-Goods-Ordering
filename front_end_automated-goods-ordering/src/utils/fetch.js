import { client } from '../services/httpClient';

//? GET
// #region  GET
//Отримати всі об'єкти dishes
export const getAllDishes = () => {
  return client.get('/api/dishes/');
};

// Отримати інформацію про конкретний об'єкт dishes за його id
export const getDishById = (id) => {
  return client.get(`/api/dishes/${id}`);
};

// Отримати всі об'єкти categories
export const getAllCategories = () => {
  return client.get('/api/categories/');
};

// Отримати всі об'єкти tags
export const getAllTags = () => {
  return client.get('/api/tags/');
};

// Отримати всі об'єкти dishes, які належать конкретній категорії за її id
export const getDishesByCategoryId = (id) => {
  return client.get(`/api/categories/get_dishes/${id}`);
};

// Отримати всі об'єкти ingredients
export const getAllIngredients = () => {
  return client.get('/api/ingredients/');
};

// Отримати інформацію про конкретний об'єкт ingredients за його id
export const getIngredientById = (id) => {
  return client.get(`/api/ingredients/${id}`);
};

// Отримати всі об'єкти premixes
export const getAllPremixes = () => {
  return client.get('/api/premixes/');
};

// Отримати всі об'єкти providers
export const getAllProviders = () => {
  return client.get('/api/providers/');
};

// Отримати всі об'єкти users
export const getAllUsers = () => {
  return client.get('/api/users/');
};

// Отримати список замовлень інгредієнтів
export const getIngredientOrders = () => {
  return client.get('/api/ingredients/orders');
};

// Запит для отримання всіх об'єктів dishes, які є в стоп-листі
export const getDishesInStopList = () => {
  return client.get('/api/stop-list/');
};

// Запит для отримання всіх об'єктів dishes, які потрібно продати
export const getDishesToBeSold = () => {
  return client.get('/api/dishes/dish_to_sold');
};

// Запит для отримання всіх об'єктів dishes, яких мало
export const getFewDishes = () => {
  return client.get('/api/dishes/few');
};
// #endregion GET

//? POST
// #region  POST

// Створення нового об'єкту dishes
export const createNewDish = (formData) => {
  return client.post('/api/dishes/create_new_dish', formData);
};

// Створення нової категорії
export const addCategory = (categoryData) => {
  return client.post('/api/categories/add_category', categoryData);
};

// Створення нового об'єкту premixes
export const createPremix = (premixData) => {
  return client.post('/api/premixes/create_premix', premixData);
};
// #endregion POST

//? PUT
// #region  PUT
// PUT-запит для оновлення існуючого об'єкту dishes

export const updateDish = (formData) => {
  return client.put('/api/dishes/update', formData);
};
// #endregion

//? PATCH
// #region  PATCH

// PATCH-запит для зміни фотографії в існуючому об'єкті dishes
export const updatePhoto = (formData) => {
  return client.patch('/api/dishes/update_photo', formData);
};

// PATCH-запит для зміни полів в існуючому об'єкті dishes
export const patchDish = (data) => {
  return client.patch('/api/dishes/patch', data);
};

// PATCH-запит для зміни полів в існуючому об'єкті ingredients
export const patchIngredient = (data) => {
  return client.patch('/api/ingredients/patch', data);
};

// PATCH-запит для зміни полів в існуючому об'єкті user
export const patchUser = (data) => {
  return client.patch('/api/user/patch', data);
};

// PATCH-запит для зміни полів в існуючому об'єкті comments
export const patchComment = (data) => {
  return client.patch('/api/comments/patch', data);
};
// #endregion

//? DELETE
// #region  DELETE

// DELETE-запит для видалення об'єкту dishes за його id
export const deleteDish = (id) => {
  return client.delete(`/api/dishes/delete/${id}`);
};

// DELETE-запит для видалення категорії за її id
export const deleteCategory = (id) => {
  return client.delete(`/api/categories/delete/${id}`);
};

// DELETE-запит для видалення тегу за його id
export const deleteTag = (id) => {
  return client.delete(`/api/tags/delete/${id}`);
};

// DELETE-запит для видалення коментаря за його id
export const deleteComment = (id) => {
  return client.delete(`/api/comments/delete/${id}`);
};

// DELETE-запит для видалення преміксу за його id
export const deletePremix = (id) => {
  return client.delete(`/api/premixess/delete/${id}`);
};

// DELETE-запит для видалення користувача за його id
export const deleteUser = (id) => {
  return client.delete(`/api/users/delete/${id}`);
};

// DELETE-запит для видалення постачальника за його id
export const deleteProvider = (id) => {
  return client.delete(`/api/providers/delete/${id}`);
};

// DELETE-запит для видалення страви зі стоп-листу за її id
// export const deleteDishFromStopList = (id) => {
//   return client.delete(`/api/dishes/dish_to_sold/delete/${id}`);
// };
// #endregion




//!СТАРІ ЗАПИТИ
// #region  OLD
// //отримано всіх обєктів
// export const getAllDishes = () => {
//   return client.get('/api/dishes/');
// };
// //id конкретного обєкту
// export const getDish = (id) => {
//   return client.get(`/api/dishes/${id}`);
// };
// //отримати всі обєкти dishes які належать конкретній категорії
// export const getAllDishCategory = (id) => {
//   return client.get(`/api/categories/get_dishes/${id}`);
// };
// //отримати всі обєкти categories
// export const getAllCategories = () => {
//   return client.get('/api/categories/');
// };
// //отримати всі обєкти tags
// export const getAllTags = () => {
//   return client.get('/api/tags/');
// };




// //відправка нового обєкту
// export const addDish = (data) => {
//   return client.post('/api/dishes/create_new_dish', data);
// };
// //відправка нової категорії
// export const addCategoty = (data) => {
//   return client.post('/api/categories/add_category', data);
// };




// //  замінити існуюсий обєкт на новий з тим самим id
// export const replaceDish = (data) => {
//   return client.put('/api/dishes/update', data);
// };
// //змінити в існуюючому обєкті поле photo
// export const updatePhoto = (data) => {
//   return client.patch('/api/dishes/update_photo', data);
// };
// //змінити в існуюючому обєкті поля
// export const updateDish = (data) => {
//   return client.patch('/api/dishes/patch', data);
// };




// //видалити обєкт
// export const deleteDish = (id) => {
//   return client.delete(`/api/dishes/delete/${id}`);
// };
// //видалити категорію
// export const deleteCategory = (id) => {
//   return client.delete(`/api/categories/delete/${id}`);
// };
// //видалити тег
// export const deleteTag = (id) => {
//   return client.delete(`/api/tags/delete/${id}`);
// };
// #endregion
