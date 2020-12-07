import axios from 'axios';

const api = {
  base: 'https://api.unsplash.com/search/photos?',
  key: 'LnsEDXyIyXhqJnORCYSxS6bX3DOAw4U1B0YNHlGUEBA',
}

const getImages = async () => {
  // const query = 'Landscape';
  const images = axios.get(api.base+`query=Landscape&client_id=${api.key}`)
  .then(res => res.data.results
    .map((img)=>(
    {
      thumb: img.urls.thumb,
      full: img.urls.full,
    }
  )));
  return images;
};

export { getImages };