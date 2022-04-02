import { ImageGalleryLi, ImageGallery } from './ImageGalleryItem.jsx';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  webformatURL,
  tags,
}) => {
  return (
    <ImageGalleryLi >
      <ImageGallery src={webformatURL} alt={tags} />
    </ImageGalleryLi>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
