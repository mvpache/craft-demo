import React from 'react';
import PropTypes from 'prop-types';

// A "pokemon" component that shows name + image -> links to detail page
const Pokemon = ({ name, imgUrl }) => (
  <div>
    <img src={imgUrl} alt={name} />
    <h4>{name}</h4>
  </div>
);

export default Pokemon;

Pokemon.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
};
