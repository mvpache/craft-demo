import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// A "pokemon" component that shows name + image -> links to detail page
const Pokemon = ({ name, imgUrl, history, id }) => (
  <div onClick={() => history.push(`detail/${id}`)}>
    <img src={imgUrl} alt={name} />
    <h4>{name}</h4>
  </div>
);

export default withRouter(Pokemon);

Pokemon.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
