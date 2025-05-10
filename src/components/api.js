/* ========== КОНФИГУРАЦИЯ ========== */
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-38/',
    headers: {
      authorization: '3125c7d4-805d-4205-aa1d-1e91ea1995cb',
      'Content-Type': 'application/json'
    }
  };
  
  /* ========== ОБРАБОТЧИК ОТВЕТА ========== */
  const handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };
  
  /* ========== API ФУНКЦИИ ========== */
  
  // 1. Загрузка информации о пользователе
  export const getUserData = () => {
    return fetch(`${config.baseUrl}users/me`, {
      headers: config.headers
    })
    .then(handleResponse);
  };
  
  // 2. Загрузка карточек с сервера
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}cards`, {
      headers: config.headers
    })
    .then(handleResponse);
  };
  
  // 3. Редактирование профиля
  export const editProfile = (userName, about) => {
    return fetch(`${config.baseUrl}users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: userName,
        about: about 
      })
    })
    .then(handleResponse);
  };
  
  // 4. Добавление новой карточки
  export const addCard = (cardName, link) => {
    return fetch(`${config.baseUrl}cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: cardName,
        link: link
      })
    })
    .then(handleResponse);
  };
  
  // 5. Управление лайками
  export const toggleLike = (cardId, isLiked) => {
    return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: config.headers
    })
    .then(handleResponse);
  };
  
  // 6. Удаление карточки
  export const deleteCardFromServer = (cardId) => {
    return fetch(`${config.baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(handleResponse);
  };
  
  // 7. Обновление аватара
  export const editAvatarServer = (avatarLink) => {
    return fetch(`${config.baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
    .then(handleResponse);
  };
// const config = {
//     baseUrl: 'https://nomoreparties.co/v1/wff-cohort-38/',
//     headers: {
//       authorization: '3125c7d4-805d-4205-aa1d-1e91ea1995cb',
//       'Content-Type': 'application/json'
//     }
//   }
// //Обработчик ответа,чтобы не писать каждый раз одно и тоже 
// const handleResponse = (res) => {
//     if(res.ok) {
// return res.json();
//     }
//     return Promise.reject(`Ошибка: ${res.status}`);
// }
// //3. Загрузка информации о пользователе с сервера
// export const getUserData = () => {
//     return fetch('https://nomoreparties.co/v1/wff-cohort-38/users/me',{
//         headers: {
//             authorization: '3125c7d4-805d-4205-aa1d-1e91ea1995cb'
//           }
//     })
//     .then(handleResponse)
// }
// //4. Загрузка карточек с сервера
// export const getInitialCards = () => {
//     return fetch('https://nomoreparties.co/v1/wff-cohort-38/cards',{
//         headers: {
//             authorization: '3125c7d4-805d-4205-aa1d-1e91ea1995cb'
//           }
//     })
//     .then(handleResponse)
// }
// //5. Редактирование профиля
// export const editProfile = (userName, about) => {
//     return fetch('https://nomoreparties.co/v1/wff-cohort-38/users/me', {
//         method: 'PATCH',
//         headers: {
//           authorization: '3125c7d4-805d-4205-aa1d-1e91ea1995cb',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           name: userName,
//           about: about 
//         })
//       })
//       .then(handleResponse);
//   };
//   //6. Добавление новой карточки
//   export const addCard = (cardName, link) => {
//     return fetch('https://nomoreparties.co/v1/wff-cohort-38/cards ',{
//         method: 'POST',
//         headers: {
//              authorization: '3125c7d4-805d-4205-aa1d-1e91ea1995cb',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             name: cardName,
//             link: link
//         })
//     })
//     .then(handleResponse);
//   };
  
// //Запрос на сервер для добавления или удаления лайка
// export const toggleLike = (cardId, isLiked) => {
//     return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
//       method: isLiked ? 'DELETE' : 'PUT',
//       headers: {
//         authorization: config.headers.authorization,
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(handleResponse)
//   };

//   //Удаляем карточку с сервера
// export const deleteCardFromServer = (cardId) => {
//     return fetch(`${config.baseUrl}cards/${cardId}`, {
//       method: 'DELETE',
//       headers: {
//         authorization: config.headers.authorization,
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(handleResponse)
//   };

//   //Обновление аватара
// export function editAvatarServer(avatarLink) {
//     return fetch(`${config.baseUrl}users/me/avatar`, {
//       method: 'PATCH',
//       headers: {
//         authorization: config.headers.authorization,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         avatar: avatarLink
//       })
//     })
//       .then(handleResponse)
//   }