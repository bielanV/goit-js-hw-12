import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createGalleryCardTemplate } from './js/render-functions';
import { data } from './js/pixabay-api';

const sbmForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.js-load-more');
let searchedValue = '';
let page = 1;
let cardHeight = 0;
let countElLi = 0;

const galleryCreate = new SimpleLightbox('.gallery-link', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

const onFormSbm = async event => {
  try {
    event.preventDefault();
    page = 1;
    countElLi = 0;
    searchedValue = sbmForm.elements.user_query.value.trim();

    if (!loadMoreBtnEl.classList.contains('is-hidden')) {
      loadMoreBtnEl.classList.add('is-hidden');
    }

    if (searchedValue === '') {
      iziToast.show({
        message: `❌ Sorry, there are no images matching your search query. Please try again!`,
        color: 'red',
        position: 'topRight',
      });
      return;
    }
    loader.classList.add('is-open');

    const response = await data(searchedValue, page);

    if (response.data.total === 0) {
      loader.classList.remove('is-open');
      sbmForm.reset();
      iziToast.show({
        message: `❌ Sorry, there are no images matching your search query. Please try again!`,
        color: 'red',
        position: 'topRight',
      });
      gallery.innerHTML = '';
      return;
    }

    const galleryCardsTemplate = response.data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');
    sbmForm.reset();
    loader.classList.remove('is-open');
    gallery.innerHTML = galleryCardsTemplate;

    galleryCreate.refresh();

    const galleryCardEl = gallery.querySelector('li');
    cardHeight = galleryCardEl.getBoundingClientRect().height;

    countElLi = document.querySelectorAll('.gallery-card');
    if (response.data.totalHits === countElLi.length) {
      iziToast.show({
        message: `That's all we could find on your request`,
        color: 'yellow',
        position: 'topRight',
      });
      return;
    }
    loadMoreBtnEl.classList.remove('is-hidden');
  } catch (err) {
    console.log(err);
  }
};

const loadMorePhoto = async event => {
  try {
    page += 1;
    loader.classList.add('is-open');
    const loadResponse = await data(searchedValue, page);
    const galleryCardsTemplate = loadResponse.data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');
    gallery.insertAdjacentHTML('beforeend', galleryCardsTemplate);

    galleryCreate.refresh();

    loader.classList.remove('is-open');
    scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    countElLi = document.querySelectorAll('.gallery-card');
    console.log(loadResponse.data.totalHits);
    console.log(countElLi.length)

    if (loadResponse.data.totalHits <= countElLi.length) {
      loadMoreBtnEl.classList.add('is-hidden');
      iziToast.show({
        message: `We're sorry, but you've reached the end of search results.`,
        color: 'yellow',
        position: 'topRight',
      });
    }
  } catch (err) {
    console.log(err);
  }
};

sbmForm.addEventListener('submit', onFormSbm);
loadMoreBtnEl.addEventListener('click', loadMorePhoto);