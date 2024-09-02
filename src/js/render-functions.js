export const createGalleryCardTemplate = imgInfo => {
  return `
  <li class="gallery-card"><a class="gallery-link" href="${imgInfo.largeImageURL}">
    <img class="gallery-img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}"/>
</a><div class ="card-data">  <ul class="data-list"><li class="image-data"><p class="image-data-text">Views</p><p class="image-data-text">${imgInfo.views}</p></li>
  <li class="image-data"><p class="image-data-text">Likes</p><p class="image-data-text">${imgInfo.likes}</p></li>
  <li class="image-data"><p class="image-data-text">Comments</p><p class="image-data-text">${imgInfo.comments}</p></li>
  <li class="image-data"><p class="image-data-text">Downloads</p><p class="image-data-text">${imgInfo.downloads}</p></li>
  </ul></div></li>
  `;
};