import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import getAPI from './ApiPixa/ApiPixa';
import { ToastContainer, toast } from 'react-toastify';
import { SRLWrapper } from 'simple-react-lightbox';

axios.defaults.baseURL = 'https://pixabay.com/api';

export default function App() {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (imageName === '') {
      return;
    }
    setLoading(true);

   getAPI(imageName, page).then((res) => {
      const NewImages = res.data.hits.map(
        ({ id, tags, webformatURL }) => {
          return { id, tags, webformatURL };
        }
      );

      if (NewImages.length === 0) {
        setLoading(false);
        return toast.error('Wrong request, try again!', { position: 'center' });
      }

      setImages((prevImages) => [...prevImages, ...NewImages]);
      setLoading(false);
    })
  }, [page, imageName]);

  const handleFormSubmit = searchQuery => {
    setImageName(searchQuery);
    setImages([]);
    setPage(1);
  };

  const moreBtn = () => {
    setPage((page) => page + 1)
  }

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <SRLWrapper>
        <ImageGallery images={images} />
      </SRLWrapper>

      {loading ? (
        <Loader />
      ) : (
        images.length > 0 &&
        images.length % 12 === 0 && <Button more={moreBtn} />
      )}

      <ToastContainer
        autoClose={1500}
        theme="colored"
        position="center"
        icon="🚀"
      />
    </>
  );
}
