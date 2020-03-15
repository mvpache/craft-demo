import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {} from 'react-router-dom';

class PokemonDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      long: 0,
    };
  }

  componentDidMount() {
    // call the api for the map
  }

  render() {
    const { pokemonList } = this.props;
    const { id } = this.props.match.params;
    console.log(this.props);
    const pokemon = pokemonList.find(_pokemon => _pokemon.id === id);
    return <div>{pokemon.name}</div>;
  }
}

export default PokemonDetail;

PokemonDetail.propTypes = {
  pokemonList: PropTypes.array.isRequired,
};
