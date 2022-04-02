import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const KEY = '24766910-00839278ca6ea16c8fc83aa9e';

const getAPI = (imageName, page) => {
  return axios.get(
    `${BASE_URL}/?q=${imageName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};

export default getAPI;
