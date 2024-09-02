import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/';

export const data = (searchedValue, pages) => {
  const axiosOptions = {
    params: {
      key: '45764445-59cc1762e95f1291ab4a968b5',
      q: searchedValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: pages,
      per_page: 15,
    },
  };
  return axios.get('api/', axiosOptions);
};