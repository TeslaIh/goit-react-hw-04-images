import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
// import { SRLWrapper } from 'simple-react-lightbox';

axios.defaults.baseURL = 'https://pixabay.com/api';

export default function App() {
  const [searchItem, setSearchItem] = useState('');
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('zero');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [imageModal, setImageModal] = useState(null);

  useEffect(() => {
    if (searchItem === '') {
      return;
    }

    async function fetchImages() {
      setStatus('pending');

      try {
        const response = await axios.get(
          `/?q=${searchItem}&page=${page}&key=3705719-850a353db1ffe60c326d386e6&image_type=photo&orientation=horizontal&per_page=12`
        );
        const currenItems = response.data.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => {
            return { id, webformatURL, largeImageURL, tags };
          }
        );
        setItems(items => [...items, ...currenItems]);
        setStatus('resolved');

        if (response.data.hits.length === 0) {
          toast.error('Wrong request, try again!', { position: 'center' });
        }
      } catch (error) {
        toast.error('TOTAL EXECUTION!!!', { position: 'center' });
        setStatus('rejected');
      }
    }
    fetchImages();
  }, [searchItem, page]);

  const handleFormSubmit = searchQuery => {
    setSearchItem(searchQuery);
    setItems([]);
    setPage(1);
  };

  const toggleModal = largeImageURL => {
    setShowModal(showModal => !showModal);
    setImageModal(largeImageURL);

    //   toggleModal = (e) => {
    //   this.setState(({ showModal }) => ({
    //     showModal: false,
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      
      {items.length > 0 && (
        
          <ImageGallery pictures={items} onClick={toggleModal}> 
          </ImageGallery>
        
      )}
      {status === 'pending' && <Loader />}
      {(items.length === 12 || items.length > 12) && (
        <Button onClick={() => setPage(page => page + 1)} />
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={imageModal} alt="" />
        </Modal>
        
      )}

      <ToastContainer
        autoClose={1500}
        theme="colored"
        position="top-right"
        icon="🚀"
      />
    </>
  );
}
