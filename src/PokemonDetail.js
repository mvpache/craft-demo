import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PokemonDetailsContainer = styled.div`
  display: flex;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin: 2% 5%;
`;

const Info = styled.div`
  height: 30%;
`;

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
          <PokemonDetailsContainer>
            <Details>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                style={{ height: '250px' }}
              />
              <Info>
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
              </Info>
            </Details>
            <div>
              <Map
                google={this.props.google}
                zoom={10}
                style={{ height: '60%', width: '60%' }}
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
          </PokemonDetailsContainer>
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
