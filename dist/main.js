(() => {
  var e = document.querySelector('#card-template').content,
    t = document.querySelector('.places__list');
  function r(e) {
    e.target.closest('.card').remove();
  }
  initialCards.forEach(function (c) {
    var a = (function (t, r) {
      var c = e.querySelector('.places__item').cloneNode(!0),
        a = c.querySelector('.card__image');
      return (
        (a.src = t.link),
        (a.alt = t.alt),
        (c.querySelector('.card__title').textContent = t.name),
        c.querySelector('.card__delete-button').addEventListener('click', r),
        c
      );
    })(c, r);
    t.append(a);
  });
})();
