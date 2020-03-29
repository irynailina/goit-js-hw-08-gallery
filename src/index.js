"use strict";
import pictures from "./gallery-items.js";

const galleryList = document.querySelector(".js-gallery");

for (const picture of pictures) {
  galleryList.insertAdjacentHTML(
    "beforeEnd",
    `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${picture.original}"
      >
        <img
          class="gallery__image"
          src="${picture.preview}"
          data-source="${picture.original}"
          alt="${picture.description}"
        />
      </a>
    </li>`
  );
}

const modalWindow = document.querySelector(".js-lightbox");
const modalButton = document.querySelector('button[data-action="close-modal"]');
const modalImage = document.querySelector(".lightbox__image");

function openModal(event) {
  event.preventDefault();
  if (event.target.nodeName === "IMG") {
    modalWindow.classList.add("is-open");
    modalImage.setAttribute("src", event.target.dataset.source);
  }
}

function closeModal() {
  if (event.target.nodeName !== "IMG") {
    modalWindow.classList.remove("is-open");
    modalImage.src = "";
  }
}

window.onkeydown = function(event) {
  if (event.keyCode === 27) {
    closeModal();
  } else if (event.keyCode === 39) {
    showNext();
  } else if (event.keyCode === 37) {
    showPrev();
  }
};

const slides = [...pictures];
function showNext() {
  for (let i = 0; i < slides.length; i++) {
    modalImage.setAttribute("src", slides[i].original);
  }
}

function showPrev() {
  for (let i = 0; i < slides.length; i -= 1) {
    modalImage.setAttribute("src", slides[i].original);
  }
}

galleryList.addEventListener("click", openModal);
modalButton.addEventListener("click", closeModal);
modalWindow.addEventListener("click", closeModal);
