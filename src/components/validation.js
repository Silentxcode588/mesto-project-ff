/**
 * Объект опции:
 * 1. Элемент формы.
 * 2. Элемент поля ввода.
 * 3. Кнопка отправки формы.
 * 4. Класс для отключения кнопки.
 * 5. Класс для выделения попапа цветом.
 * 6. Класс для отображения попапа.
 */
// // Объект настроек валидации
// const validationConfig = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible',
// };
// Включение валидации
export function enableValidation(config) {
  // const forms = Array.from(document.querySelectorAll(config.formSelector));
  const selectedForms = document.querySelectorAll(config.formSelector)
  const forms = Array.from(selectedForms)
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

// Установка обработчиков событий
function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);

  toggleButtonState(inputs, submitButton, config);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input, config);
      toggleButtonState(inputs, submitButton, config);
    });
  });
  
}

// Проверка валидности поля
function isValid(form, input, config) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  if (input.validity.valid) {
    hideInputError(input, errorElement, config);
  } else {
    showInputError(input, errorElement, config);
  }
}

// Показать ошибку в спане
function showInputError(input, errorElement, config) {
  input.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = input.validity.patternMismatch ? input.dataset.errorMessage : input.validationMessage;
}

// Скрыть ошибку в спане
function hideInputError(input, errorElement, config) {
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
  input.setCustomValidity("");
}

// Переключение состояния кнопки
function toggleButtonState(inputs, button, config) {
  const isValid = inputs.every((input) => input.validity.valid);
  button.disabled = !isValid;
  button.classList.toggle(config.inactiveButtonClass, !isValid);
}

// Очистка валидации
export function clearValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    hideInputError(input, errorElement, config);
  });

  toggleButtonState(inputs, submitButton, config);
}





























// //Работаем с формой 'редактировать профиль'
// //Находим форму в DOM
// const editProfileForm = document.querySelector('.popup_type_edit');
// const formElement = editProfileForm.querySelector('.popup__form')

// //Находим поля формы в DOM 
// const nameInput = formElement.querySelector('.popup__input');
// const descriptionInput = formElement.querySelector('.popup__input_type_description');

// //Находим кнопку
// const submitButton = formElement.querySelector('.popup__button');

// // Слушатель события
// nameInput.addEventListener('input', function (evt) {
//   // Выведем в консоль значение свойства validity.valid поля ввода, 
//   // на котором слушаем событие input
//   console.log(evt.target.validity.valid);
// });

// // Функция, которая добавляет класс с ошибкой
// const showInputError = (element, errorMessage) => {
//   const errorElement = formElement.querySelector(`.${element.id}-error`);
//   element.classList.add('form__input_type_error');
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add('popup__error_visible');
// };

// // Функция, которая удаляет класс с ошибкой
// const hideInputError = (element) => {
//   const errorElement = formElement.querySelector(`.${element.id}-error`);
//   element.classList.remove('form__input_type_error');
//   errorElement.textContent = '';
//   errorElement.classList.remove('.popup__error_visible');
// };

// // Функция, которая проверяет валидность поля
// const isValid = (evt) => {
//   const nameInput = evt.target
//   if (nameInput.validity.patternMismatch) {
//     // Если поле не проходит валидацию, покажем ошибку
//     showInputError(nameInput, nameInput.dataset.errorMessage);
//   }   else {
//     // Если проходит, скроем
//     hideInputError(nameInput);
//   }
//   if (!inputElement.validity.valid) {
//     showInputError(nameInput,validationMessage);
//   } else {
//     hideInputError(formElement, nameInput);
//   }
// }; 
// // Вызовем функцию isValid на каждый ввод символа
// nameInput.addEventListener('input', isValid);


