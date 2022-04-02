import React from 'react';
import { Button, ButtonDiv } from './Button.jsx';
import PropTypes from 'prop-types';

const LoadMoreBtn = ({ more }) => {
  return (
    <ButtonDiv>
      <Button type="submit" onClick={more}>
        {' '}
        Load more
      </Button>
    </ButtonDiv>
  );
};

export default LoadMoreBtn;

LoadMoreBtn.propTypes = {
  more: PropTypes.func.isRequired,
};
