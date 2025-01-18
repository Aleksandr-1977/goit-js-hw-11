import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.input-search');
const galleryElem = document.querySelector('.gallery-list');

const createGalleryCard = imgCard => {
  return `<li class="gallery-card"> <img class="gallery-img" src="${imgCard.largeImageURL}" alt="${imgCard.tags}"/></li>`;
};

const onSearchFormSubmit = event => {
  event.preventDefault();
  const searchData = event.currentTarget.elements.input.value.trim();
  if (searchData === '') {
    alert('Поле должно быть заполнено!');
    return;
  }
  fetch(
    `https://pixabay.com/api/?key=48265193-8ac6160565acb44bbb7dfb3fe&q=${searchData}&image_type=photo&per_page=9`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        alert('По запросу информации не найдено. Введите другой запрос.');
        galleryElem.innerHTML = '';
        searchForm.reset();
        return;
      }
      const galleryTemplate = data.hits
        .map(el => createGalleryCard(el))
        .join('');
      galleryElem.innerHTML = galleryTemplate;
      console.log(data);
    })
    .catch(error => {
      if (error.mesage === '404') {
        arert('Ошибка');
      }
    });
};
searchForm.addEventListener('submit', onSearchFormSubmit);
