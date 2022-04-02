import {ImageGalleryList} from './ImageGallery.jsx';
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";

export const ImageGallery = ({ images }) => {
  return (
    <ImageGalleryList>
      {images.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
        />
      ))}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};