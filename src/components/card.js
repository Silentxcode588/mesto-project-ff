/* ========== ИМПОРТЫ ========== */
import { toggleLike } from './api.js';
import { handleCheckError } from './index.js';

/* ========== ФУНКЦИИ ========== */
// Функция создания карточки
export function createCard(card, cardTemplate, deleteCallback, likeCallback, imageCallback, userId) {
    // 1. Клонируем шаблон карточки
    const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
    
    // 2. Находим элементы карточки
    const imageCard = cardItem.querySelector(".card__image");
    const cardTitle = cardItem.querySelector(".card__title");
    const deleteButton = cardItem.querySelector(".card__delete-button");
    const likeButton = cardItem.querySelector(".card__like-button");
    const cardNumberOfLikes = cardItem.querySelector('.card__number-of-likes');
    
    // 3. Заполняем данные карточки
    imageCard.src = card.link;
    imageCard.alt = card.name;
    cardTitle.textContent = card.name;
    cardNumberOfLikes.textContent = card.likes.length;
    cardItem.dataset.id = card._id;
    cardItem.dataset.likes = JSON.stringify(card.likes);

    // 4. Настройка кнопки удаления (видна только для своих карточек)
    if (card.owner._id === userId) {
        deleteButton.style.display = 'block';
        deleteButton.addEventListener('click', () => deleteCallback(cardItem, card._id));
    } else {
        deleteButton.style.display = 'none';
    }

    // 5. Настройка кнопки лайка
    const isLikedByUser = card.likes.some(user => user._id === userId);
    if (isLikedByUser) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', () => likeCallback(cardItem, card._id));

    // 6. Обработчик открытия изображения
    imageCard.addEventListener('click', () => imageCallback(cardItem)); //card.link, card.name
    
    // 7. Возвращаем готовую карточку
    return cardItem;
}

// Функция удаления карточки
export function deleteOneCard(cardItem) {
    cardItem.remove();
}

// Функция обработки лайка
export function likeCard(cardItem, cardId) {
    const likeButton = cardItem.querySelector('.card__like-button');
    const cardNumberOfLikes = cardItem.querySelector('.card__number-of-likes');
    const currentLikes = JSON.parse(cardItem.dataset.likes);
  
    // Проверяем текущее состояние лайка
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
  
    toggleLike(cardId, !isLiked)
      .then(updatedCard => {
        // Обновляем данные карточки
        cardNumberOfLikes.textContent = updatedCard.likes.length;
        cardItem.dataset.likes = JSON.stringify(updatedCard.likes);
        
        // Обновляем состояние кнопки
        likeButton.classList.toggle('card__like-button_is-active');
      })
      .catch(handleCheckError);
}
// // Функция создания карточки
// export function createCard(card, deleteCallback, imageCallback, likeCallback,userId) {
//     // 1. Находим шаблон карточки и клонируем его
//     const cardTemplate = document.querySelector("#card-template").content;
//     const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
    
//     // 2. Находим элементы карточки
//     const imageCard = cardItem.querySelector(".card__image");
//     const cardTitle = cardItem.querySelector(".card__title");
//     const deleteButton = cardItem.querySelector(".card__delete-button");
//     const likeButton = cardItem.querySelector(".card__like-button");
//     const cardNumberOfLikes = cardItem.querySelector('.card__number-of-likes');
//     // 3. Заполняем данные карточки
//     imageCard.src = card.link;       // Устанавливаем ссылку на изображение
//     imageCard.alt = card.name;      // Устанавливаем альтернативный текст
//     cardTitle.textContent = card.name; // Устанавливаем заголовок
//     cardNumberOfLikes.textContent = card.likes.length;
//     cardItem.dataset.id = card._id;

//       // Показываем кнопку удаления только на своих карточках
//   if (card.owner._id === userId) {
//     deleteButton.style.display = 'block';
//      deleteButton.addEventListener('click', () => deleteCallback(cardItem, card._id));
//   } else {
//     deleteButton.style.display = 'none';
//   }
//     // 4. Добавляем обработчики событий
//     // 4.1. Обработчик удаления карточки
//     deleteButton.addEventListener("click", deleteCallback);
//     // 4.2. Обработчик лайка
//     likeButton.addEventListener("click", likeCallback);
//     // 4.3. Обработчик открытия изображения
//     imageCard.addEventListener("click", () => imageCallback(card.link, card.name));
    
//     // 5. Возвращаем готовую карточку
//     return cardItem;
// }

// // Функция удаления карточки
// export function deleteOneCard(evt) {
//     evt.target.closest(".card").remove();
// }

// // Лайк
// export function likeCard(cardItem, cardId, userId) {
//     const likeButton = cardItem.querySelector('.card__like-button');
//     const cardNumberOfLikes = cardItem.querySelector('.card__number-of-likes');
  
//     // Проверяем, есть ли лайк от текущего пользователя
//     const isLiked = likeButton.classList.contains('card__like-button_is-active');
  
//     toggleLike(cardId, isLiked)
//       .then(updatedCard => {
//         // Обновляем количество лайков
//         cardNumberOfLikes.textContent = updatedCard.likes.length;
  
//         // Проверяем лайк после ответа от сервера
//         const isStillLiked = updatedCard.likes.some(user => user._id === userId);
  
//         // Обновляем состояние кнопки
//         likeButton.classList.toggle('card__like-button_is-active', isStillLiked);
//       })
//       .catch(handleCheckError);
//   }