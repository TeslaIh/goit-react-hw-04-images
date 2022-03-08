import React from "react";
import "./App.css";

import Loader from "./components/Loader";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SRLWrapper } from 'simple-react-lightbox';
import { toast } from "react-toastify";

export default class App extends React.Component {
  state = {
    searchQuery: "",
    imageData: [],
    page: 1,
    error: null,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {

    const oldQuery = prevState.searchQuery;
    const newQuery = this.state.searchQuery;

    if (oldQuery !== newQuery) {
      console.clear();
      this.fetchArray();
    }

    const oldPage = prevState.page;
    const newPage = this.state.page;

    if (oldPage !== newPage) {
      this.fetchArray();
    }
  }

  formSubmitHandler = (searchQuery) => {
    if (this.state.searchQuery === searchQuery) {
      toast.error("You enter the same word!!! Enter new one!!!", {
        theme: "colored",
        position: "top-right",
      });
    }

    if (this.state.searchQuery !== searchQuery) {
      this.setState({
        searchQuery: searchQuery,
        page: 1,
        imageData: [],
        error: null,
        showModal: false,
      });
    }
  };

  fetchArray = () => {
    const { searchQuery, page } = this.state;

    this.setState({ loading: true });

    fetch(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=3705719-850a353db1ffe60c326d386e6&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(new Error(`No images with ${"newSearch"}`));
      })
      .then((data) => {
        this.setState((prevState) => ({
          fetchData: data,
          imageData: [
            ...prevState.imageData,
            ...data.hits.map(({ id, webformatURL, tags, largeImageURL }) => ({
              id: id,
              webformatURL: webformatURL,
              tags: tags,
              largeImageURL: largeImageURL,
            })),
          ],
          arrayLength: data.hits.length,
        }));
      })
      .catch((error) => {
        this.setState({ error });
        toast.error(`${error}`, {
          theme: "colored",
          position: "top-right",
        });
      })
      .finally(() => {
        this.lastImagesInDB();

        this.setState({ loading: false });
      });
  };

  loadMoreImages = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = (e) => {
    this.setState(({ showModal }) => ({
      showModal: false,
    }));
  };

  imgInfo = (e) => {
    const altImg = e.currentTarget.getAttribute("alt");
    const largeImg = e.currentTarget.getAttribute("largeimageurl");

    this.setState({
      largeImageURL: largeImg,
      alt: altImg,
    });
  };

  lastImagesInDB = () => {
    const arrL = this.state.arrayLength;

    if (arrL !== 12) {
      toast.warn("No more images in DataBase!!!", {
        theme: "colored",
        icon: "🚀",
        position: "top-right",
      });
      return;
    }
  };

  reset = () => {
    this.setState({
      imageData: [],
      page: 1,
      searchQuery: "",
      error: null,
    });
  };

  render() {
    const { showModal, largeImageURL, alt, imageData, loading, arrayLength } =
      this.state;

    return (
      <div className="App">
        
        <Searchbar onSubmit={this.formSubmitHandler} />

        {imageData.length > 0 && (
          <SRLWrapper>
          <ImageGallery
            imageData={imageData}
            showModal={this.toggleModal}
            imgInfo={this.imgInfo}
            ></ImageGallery>
           </SRLWrapper>
        )}

        {loading && <Loader loading={loading} />}

        {showModal && (
          <Modal showModal={this.toggleModal}>
            <img src={largeImageURL} alt={alt} />
          </Modal>
        )}

        {imageData && arrayLength === 12 && (
          <Button onClick={this.loadMoreImages} />
        )}

        <ToastContainer
          autoClose={1500}
          theme="colored"
          position="top-right"
          icon="🚀"
        />
      </div>
    );
  }
}
