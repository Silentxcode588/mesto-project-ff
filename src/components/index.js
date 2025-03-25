import '../pages/index.css';
import { createCard, deleteOneCard } from './card.js'; 
import { openModal, closeModal, } from './modal.js';
import { initialCards } from './cards.js';
// @todo: DOM узлы
const cardContainer = document.querySelector(".places__list");
// Получаем элементы
const editButton = document.querySelector('.profile__edit-button'); // Кнопка "Редактировать"
const addButton = document.querySelector('.profile__add-button'); // Кнопка "+"
const imageCards = document.querySelectorAll('.card__image'); // Картинки карточек
const closeButtons = document.querySelectorAll('.popup__close'); // Кнопки закрытия
// Получаем модальные окна
const editModal = document.querySelector('.popup_type_edit'); // Попап редактирования профиля
const addModal = document.querySelector('.popup_type_new-card'); // Попап добавления карточки
const imageModal = document.querySelector('.popup_type_image'); // Попап с изображением
// Вешаем обработчики на кнопки редактирования и добавления
editButton.addEventListener('click', () => openModal(editModal)); // Открываем попап редактирования
addButton.addEventListener('click', () => openModal(addModal)); // Открываем попап добавления
// Функция для открытия модального окна с изображением
function openImageModal(link, name) {
  const popupImage = imageModal.querySelector('.popup__image');
  const popupCaption = imageModal.querySelector('.popup__caption');
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imageModal); // Открываем модальное окно
}
// Вешаем обработчики на картинки карточек
// imageCards.forEach((image) => {
//     image.addEventListener('click', () => openModal(imageModal)); // Открываем попап с изображением
// });
// Вешаем обработчики на кнопки закрытия
closeButtons.forEach((button) => {
    button.addEventListener('click', () => closeModal(button.closest('.popup'))); // Закрываем попап
});
// @todo: Вывести карточки на страницу.
initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteOneCard, openImageModal);
  cardContainer.append(cardElement);
  });
  const placesList = document.querySelector('.places_list');
  const deleteCard = (cardElement) => {
      cardElement.remove();
  }


// Находим форму в DOM
const formElement = document.querySelector('.popup__form[name="edit-profile"]');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');// или form.elements.name;
const jobInput = document.querySelector('.popup__input_type_description');  // или form.elements.description;
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
const nameValue = nameInput.value;
const jobValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');
    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);


// 1. Находим форму добавления карточки
const addCardForm = document.querySelector('.popup__form[name="new-place"]');
// 2. Находим поля ввода в форме добавления карточки
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');
// 3. Обработчик отправки формы добавления карточки
addCardForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    // 3.1. Получаем значения из формы
    const cardName = cardNameInput.value;
    const cardLink = cardLinkInput.value;
    // 3.2. Проверяем, что поля заполнены
    if (!cardName || !cardLink) {
        alert('Пожалуйста, заполните все поля');
        return;
    }
    // 3.3. Создаем объект новой карточки
    const newCard = {
        name: cardName,
        link: cardLink,
        alt: cardName // Добавляем alt для изображения
    };
    // 3.4. Создаем и добавляем карточку в начало списка
    const cardElement = createCard(newCard, deleteOneCard, openImageModal);
    cardContainer.prepend(cardElement); // Добавляем в начало контейнера
    // 3.5. Закрываем попап и очищаем форму
    closeModal(addCardForm.closest('.popup'));
    addCardForm.reset();
});
// 4. Обработчик открытия попапа добавления карточки
addButton.addEventListener('click', () => {
    // Очищаем форму при каждом открытии
    addCardForm.reset();
    openModal(addModal);
});