/* ========== ИМПОРТЫ ========== */
import '../pages/index.css';
import { createCard, deleteOneCard, likeCard } from './card.js'; 
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { 
  getInitialCards, 
  getUserData, 
  editProfile, 
  addCard, 
  deleteCardFromServer,
  editAvatarServer
} from './api.js';

/* ========== КОНСТАНТЫ И ПЕРЕМЕННЫЕ ========== */
// Объект настроек валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// Идентификатор пользователя
let userId = null;

/* ========== DOM ЭЛЕМЕНТЫ ========== */
// Основные элементы страницы
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

// Элементы карточек
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector('.places__list');

// Кнопки
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

// Модальные окна
const editProfileModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');
const confirmDeleteModal = document.querySelector('.popup_type_confirm-delete');
const confirmDeleteButton = confirmDeleteModal.querySelector('.popup__button_type_confirm');
const editAvatarModal = document.querySelector('.popup_type_avatar');

// Формы
const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]');
const addCardForm = document.querySelector('.popup__form[name="new-place"]');
const editAvatarForm = document.querySelector('.popup__form[name="update-avatar"]');

// Поля ввода
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const descriptionInput = editProfileForm.querySelector('.popup__input_type_description');
const placeNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const linkInput = addCardForm.querySelector('.popup__input_type_url');
const addCardSubmitButton = addCardForm.querySelector('.popup__button');

// Элементы модального окна изображения
const imageModalImage = imageModal.querySelector('.popup__image');
const imageModalCaption = imageModal.querySelector('.popup__caption');

/* ========== ФУНКЦИИ ========== */
// Обработчик ошибок
export const handleCheckError = (err) => {
  console.error('Ошибка:', err);
};

// Функция отрисовки карточек
function renderCards(cards) {
  cards.forEach((cardData) => {
    const cardItem = createCard(
      cardData, 
      cardTemplate, 
      handleDeleteClick, 
      handleLikeClick, 
      openImageModal, 
      userId
    );
    placesList.prepend(cardItem);
  });
}

// Функция отображения загрузки
function renderLoading(isLoading, button) {
  button.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}

/* ========== ОБРАБОТЧИКИ МОДАЛЬНЫХ ОКОН ========== */
// Открытие модального окна с изображением
function openImageModal(cardItem) {
  const imageSrc = cardItem.querySelector('.card__image').src;
  const imageCaption = cardItem.querySelector('.card__title').textContent;
  imageModalImage.src = imageSrc;
  imageModalImage.alt = imageCaption;
  imageModalCaption.textContent = imageCaption;
  openModal(imageModal);
}

/* ========== ОБРАБОТЧИКИ СОБЫТИЙ ========== */
// Обработчик события для редактирования профиля
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  const userName = nameInput.value;
  const about = descriptionInput.value;
  const formSubmitButton = editProfileForm.querySelector('[type="submit"]');

  renderLoading(true, formSubmitButton);

  editProfile(userName, about)
    .then(userData => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(editProfileModal);
    })
    .catch(handleCheckError)
    .finally(() => {
      renderLoading(false, formSubmitButton);
    });
}

// Обработчик события для добавления карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = placeNameInput.value;
  const link = linkInput.value;
  const formSubmitButton = addCardForm.querySelector('[type="submit"]');

  renderLoading(true, formSubmitButton);

  addCard(name, link)
    .then(newCard => {
      const cardItem = createCard(
        newCard, 
        cardTemplate, 
        handleDeleteClick, 
        handleLikeClick, 
        openImageModal, 
        userId
      );
      placesList.prepend(cardItem);
      closeModal(addCardModal);
      addCardForm.reset();
      clearValidation(addCardForm, validationConfig);
      addCardSubmitButton.disabled = true;
      addCardSubmitButton.classList.add(validationConfig.inactiveButtonClass);
    })
    .catch(handleCheckError)
    .finally(() => {
      renderLoading(false, formSubmitButton);
    });
}

// Обработчик для редактирования аватара
function handleEditAvatar(evt) {
  evt.preventDefault();
  const formInputValue = editAvatarForm.querySelector('#avatar_link-input').value;
  const formSubmitButton = editAvatarForm.querySelector('[type="submit"]');
  
  renderLoading(true, formSubmitButton);
  
  editAvatarServer(formInputValue)
    .then(userData => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      editAvatarForm.reset();
      closeModal(editAvatarModal);
    })
    .catch(handleCheckError)
    .finally(() => {
      renderLoading(false, formSubmitButton);
    });
}

//Обработчик события для лайка карточки
function handleLikeClick(cardItem, cardId) {
  const currentLikes = JSON.parse(cardItem.dataset.likes);
  likeCard(cardItem, cardId, currentLikes, userId);
}



// Обработчик события для удаления карточки
function handleDeleteClick(cardItem, cardId) {
  openModal(confirmDeleteModal);
  confirmDeleteButton.onclick = () => {
    deleteCardFromServer(cardId)
      .then(() => {
        deleteOneCard(cardItem);
        closeModal(confirmDeleteModal);
        confirmDeleteButton.onclick = null;
      })
      .catch(handleCheckError);
  };
}

/* ========== ИНИЦИАЛИЗАЦИЯ ========== */
// Инициализация обработчиков событий
editProfileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

addCardButton.addEventListener('click', () => {
  placeNameInput.value = '';
  linkInput.value = '';
  addCardSubmitButton.disabled = true;
  addCardSubmitButton.classList.add(validationConfig.inactiveButtonClass);
  openModal(addCardModal);
});

profileImage.addEventListener('click', () => {
  clearValidation(editAvatarForm, validationConfig);
  openModal(editAvatarModal);
});

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.popup');
    closeModal(modal);
    const form = modal.querySelector('.popup__form');
    if (form) {
      clearValidation(form, validationConfig);
    }
  });
});

// Инициализация обработчиков форм
editProfileForm.addEventListener('submit', handleEditProfileSubmit);
addCardForm.addEventListener('submit', handleAddCardSubmit);
editAvatarForm.addEventListener('submit', handleEditAvatar);

// Включение валидации
enableValidation(validationConfig);

// Загрузка начальных данных
Promise.all([getUserData(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    renderCards(cards);
  })
  .catch(handleCheckError);