const mainUrl =
  'https://pixabay.com/api/?key=45764445-59cc1762e95f1291ab4a968b5';
export const data = searchedValue =>
  fetch(
    `${mainUrl}&q=${searchedValue}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });