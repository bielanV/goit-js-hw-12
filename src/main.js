import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createGalleryCardTemplate } from './js/render-functions';
import { data } from './js/pixabay-api';

const sbmForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const onFormSbm = event => {
  event.preventDefault();
  const searchedValue = sbmForm.elements.user_query.value.trim();
  if (searchedValue === '') {
    iziToast.show({
      message: `❌ Sorry, there are no images matching your search query. Please try again!`,
      color: 'red',
      position: 'topRight',
    });
    return;
  }
  loader.classList.add('is-open');

  data(searchedValue)
    .then(data => {
      if (data.total === 0) {
        loader.classList.remove('is-open');
        sbmForm.reset();
        iziToast.show({
          message: `❌ Sorry, there are no images matching your search query. Please try again!`,
          color: 'red',
          position: 'topRight',
        });
      }
      const galleryCardsTemplate = data.hits
        .map(imgDetails => createGalleryCardTemplate(imgDetails))
        .join('');
      sbmForm.reset();
      loader.classList.remove('is-open');
      gallery.innerHTML = galleryCardsTemplate;
      new SimpleLightbox('.gallery-link', {
        captions: true,
        captionsData: 'alt',
        captionDelay: 250,
      }).refresh();
    })
    .catch(err => {
      console.log(err);
    });
};

sbmForm.addEventListener('submit', onFormSbm);