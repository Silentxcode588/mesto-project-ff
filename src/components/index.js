import '../pages/index.css';
import { createCard, deleteOneCard } from './card.js'; 
import { openModal, closeModal } from './modal.js';
// import { initialCards } from './cards.js';

/* ========== DOM ЭЛЕМЕНТЫ ========== */
// Основные элементы интерфейса
const cardContainer = document.querySelector(".places__list");
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

// Модальные окна
const editModal = document.querySelector('.popup_type_edit');
const addModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');

// Форма редактирования профиля
const profileForm = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');

// Форма добавления карточки
const addCardForm = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

/* ========== ФУНКЦИИ ========== */
// Функция открытия модального окна с изображением
function openImageModal(link, name) {
  const popupImage = imageModal.querySelector('.popup__image');
  const popupCaption = imageModal.querySelector('.popup__caption');
  
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  
  openModal(imageModal);
}

// Функция обработки лайков
function handleCardLike(evt) {
  const cardId = evt.target.closest('.card').dataset.id;
  const isLiked = evt.target.classList.toggle('card__like-button_is-active');
  // Здесь позже добавим вызов API
}

// Обработчик формы профиля
function handleProfileSubmit(evt) {
  evt.preventDefault();
  
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  
  document.querySelector('.profile__title').textContent = nameValue;
  document.querySelector('.profile__description').textContent = jobValue;
  
  closeModal(profileForm.closest('.popup'));
}

// Обработчик формы добавления карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  
  if (!cardName || !cardLink) {
    alert('Пожалуйста, заполните все поля');
    return;
  }
  
  const newCard = {
    name: cardName,
    link: cardLink,
    alt: cardName
  };
  
  const cardElement = createCard(newCard, deleteOneCard, openImageModal, handleCardLike);
  cardContainer.prepend(cardElement);
  
  closeModal(addCardForm.closest('.popup'));
  addCardForm.reset();
}

/* ========== ИНИЦИАЛИЗАЦИЯ ========== */
// Загрузка начальных карточек
// initialCards.forEach((card) => {
//   const cardElement = createCard(card, deleteOneCard, openImageModal, handleCardLike);
//   cardContainer.append(cardElement);
// });

// Обработчики кнопок
editButton.addEventListener('click', () => {
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  openModal(editModal);
});

addButton.addEventListener('click', () => {
  addCardForm.reset();
  openModal(addModal);
});

// Обработчики закрытия модалок
closeButtons.forEach((button) => {
  button.addEventListener('click', () => closeModal(button.closest('.popup')));
});

// Обработчики форм
profileForm.addEventListener('submit', handleProfileSubmit);
addCardForm.addEventListener('submit', handleAddCardSubmit);