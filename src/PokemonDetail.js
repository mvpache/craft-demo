import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
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
    const { pokemonList } = this.props;
    const { id } = this.props.match.params;
    const pokemon = pokemonList.find(_pokemon => _pokemon.id == id);
    return (
      <Fragment>
        {pokemon !== undefined ? (
          <div>
            <div>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
              <p>
                Type:
                {pokemon.types.map(type => (
                  <Fragment key={type.slot}> {type.type.name}</Fragment>
                ))}
              </p>
              <p>
                Pikachu is a yellow mouse Pokémon from the fictional Pokémon
                world that was created by Satoshi Tajiri. It is 0.4 m tall and
                it weighs 6.0 kg. The skin color is yellow with brown markings
                covering the lower portion of its back. Female Pikachu has a
                heart-shaped tail.
              </p>
            </div>
          </div>
        ) : (
          <div />
        )}
        <button onClick={() => this.props.history.goBack()}>BACK</button>
      </Fragment>
    );
  }
}

export default withRouter(PokemonDetail);

PokemonDetail.propTypes = {
  pokemonList: PropTypes.array.isRequired,
};
