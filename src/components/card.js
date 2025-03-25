// import { openModal } from "./modal.js";
// Функция создания карточки
export function createCard(card, deleteCard, openImageModal, handleLikeClick) {
    // 1. Находим шаблон карточки и клонируем его
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
    
    // 2. Находим элементы карточки
    const imageCard = cardElement.querySelector(".card__image");
    const titleElement = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
    
    // 3. Заполняем данные карточки
    imageCard.src = card.link;       // Устанавливаем ссылку на изображение
    imageCard.alt = card.name;      // Устанавливаем альтернативный текст
    titleElement.textContent = card.name; // Устанавливаем заголовок
    
    // 4. Добавляем обработчики событий
    // 4.1. Обработчик удаления карточки
    deleteButton.addEventListener("click", deleteCard);
    
    // 4.2. Обработчик лайка
    likeButton.addEventListener("click", handleLikeClick);
    
    // 4.3. Обработчик открытия изображения
    imageCard.addEventListener("click", () => openImageModal(card.link, card.name));
    
    // 5. Возвращаем готовую карточку
    return cardElement;
}

// Функция удаления карточки
export function deleteOneCard(evt) {
    evt.target.closest(".card").remove();
}