

export const SERVER_URL = 'https://ago-ago-8570935a.koyeb.app';

const handleResponse = async (response) => {
  if (!response.ok) {
    console.log('Дані з сервера не отримано');
    throw new Error('Дані з сервера не отримано');
  }
  return await response.json();
}

export const client = {
  async get(url) {
    try {
      const response = await fetch(SERVER_URL + url, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      });
      return await handleResponse(response);
    }
    catch (error) {
      console.error('Помилка при виконанні GET запиту:', error);
      throw error;
    }
  },

  async post(url, data) {
    try {
      const formData = new FormData();
      formData.append(data);
      // for (const key in data) {
      //   if (data.hasOwnProperty(key)) {
      //     formData.append(key, data[key]);
      //   }
      // }
      const response = await fetch(SERVER_URL + url, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        body: formData,
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Помилка при виконанні POST запиту:', error);
      throw error;
    }
  },

  async put(url, data) {
    try {
      const response = await fetch(SERVER_URL + url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Помилка при виконанні PUT запиту:', error);
      throw error;
    }
  },

  async patch(url, data) {
    try {
      const response = await fetch(SERVER_URL + url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Помилка при виконанні PATCH запиту:', error);
      throw error;
    }
  },

  async delete(url) {
    try {
      const response = await fetch(SERVER_URL + url, { method: 'DELETE' });
      return await handleResponse(response);
    } catch (error) {
      console.error('Помилка при виконанні DELETE запиту:', error);
      throw error;
    }
  }
}
