(()=>{const e=document.querySelector("#card-template").content,t=document.querySelector(".places__list");function c(e){e.target.closest(".card").remove()}initialCards.forEach((r=>{const n=function(t,c){const r=e.querySelector(".places__item").cloneNode(!0),n=r.querySelector(".card__image");return n.src=t.link,n.alt=t.alt,r.querySelector(".card__title").textContent=t.name,r.querySelector(".card__delete-button").addEventListener("click",c),r}(r,c);t.append(n)}))})();