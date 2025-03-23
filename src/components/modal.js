
// Функция открытия модального окна
export function openModal(modal) {
    modal.classList.add('popup_is-opened'); // Добавляем класс для отображения попапа
    document.addEventListener('keydown', handleEscapeKey); // Добавляем обработчик нажатия Esc
    modal.addEventListener('click', handleOverlayClick); // Добавляем обработчик клика по оверлею
}
// Функция закрытия модального окна
export function closeModal(modal) {
    modal.classList.remove('popup_is-opened'); // Убираем класс для скрытия попапа
    document.removeEventListener('keydown', handleEscapeKey); // Убираем обработчик нажатия Esc
    modal.removeEventListener('click', handleOverlayClick); // Убираем обработчик клика по оверлею
}
// Обработчик нажатия клавиши Esc
function handleEscapeKey(evt) {
    if (evt.key === 'Escape') {
        const openModal = document.querySelector('.popup_is-opened'); // Находим открытый попап
        if (openModal) {
            closeModal(openModal); // Закрываем его
        }
    }
}
// Обработчик клика по оверлею
function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) { // Проверяем, что клик был по оверлею
        closeModal(evt.currentTarget); // Закрываем попап
    }
}
