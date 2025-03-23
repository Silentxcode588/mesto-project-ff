import { openModal } from "./modal.js";

// @todo: Функция создания карточки
export function createCard(card, deleteCard, openImageModal) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true); //клонируем карточку
  const imageCard = cardElement.querySelector(".card__image"); // Настройка изображения
  imageCard.src = card.link;
  imageCard.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name; // Настройка заголовка

  const deleteButton = cardElement.querySelector(".card__delete-button"); //Обработчик клика по кнопке удаления
  deleteButton.addEventListener("click", deleteCard);

  imageCard.addEventListener("click", () => openImageModal(card.link, card.name));
  return cardElement;
}
// @todo: Функция удаления карточки
export function deleteOneCard(evt) {
  evt.target.closest(".card").remove();

}

// // Вешаем обработчики на картинки карточек
// imageCards.forEach((image) => {
//     image.addEventListener('click', () => openModal(imageModal)); // Открываем попап с изображением
// });
