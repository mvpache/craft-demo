import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import PropTypes from 'prop-types';

class PokemonDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`https://api.craft-demo.net/pokemon/${id}`, {
        headers: {
          'x-api-key': 'HHko9Fuxf293b3w56zAJ89s3IcO9D5enaEPIg86l',
        },
      })
      .then(res => {
        this.setState({ locations: res.data.locations });
      });
  }

  render() {
    console.log(this.state.locations);
    const { pokemonList } = this.props;
    const { id } = this.props.match.params;
    const locations = this.state.locations;
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
            <div>
              <Map
                google={this.props.google}
                zoom={10}
                style={{ height: '500px', width: '500px' }}
                initialCenter={{
                  lat: 32.819218,
                  lng: -117.034432,
                }}>
                {locations.map((location, index) => {
                  const coordinates = location.split(',');
                  return (
                    <Marker
                      key={index}
                      position={{ lat: coordinates[0], lng: coordinates[1] }}
                    />
                  );
                })}
              </Map>
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

export default withRouter(
  GoogleApiWrapper({
    apiKey: 'AIzaSyBICo1KGgd5Rq0t8GEbvFJnUXsnV06kcRw',
  })(PokemonDetail)
);

PokemonDetail.propTypes = {
  pokemonList: PropTypes.array.isRequired,
};
