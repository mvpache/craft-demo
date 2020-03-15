import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

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
    return <div>{this.props.pokemon.name}</div>;
  }
}

PokemonDetail.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string,
    height: PropTypes.string,
    weight: PropTypes.string,
    type: PropTypes.string,
    sprites: PropTypes.arrayOf(
      PropTypes.shape({
        front_default: PropTypes.string,
      })
    ),
    abilities: PropTypes.arrayOf(
      PropTypes.shape({
        ability: PropTypes.shape({
          name: PropTypes.string,
        }),
      })
    ),
  }).isRequired,
  toggleBaggedPokemon: PropTypes.func.isRequired,
};
