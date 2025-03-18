import './pages/index.css';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardContainer = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(card, deleteCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true); //клонируем карточку
  const imageCard = cardElement.querySelector(".card__image"); // Настройка изображения
  imageCard.src = card.link;
  imageCard.alt = card.alt;
  cardElement.querySelector(".card__title").textContent = card.name; // Настройка заголовка
  const deleteButton = cardElement.querySelector(".card__delete-button"); //Обработчик клика по кнопке удаления
  deleteButton.addEventListener("click", deleteCard);
  return cardElement;
}
// @todo: Функция удаления карточки
function deleteOneCard(evt) {
  evt.target.closest(".card").remove();
}
// @todo: Вывести карточки на страницу.
initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteOneCard);
  cardContainer.append(cardElement);
});
