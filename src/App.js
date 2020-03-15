import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';

import Pokemon from './Pokemon';

const PokemonList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 10%;
  justify-content: space-between;
`;

const PokemonContainer = styled.div`
  width: 20%;
`;

// DEMO NOTES/TODOS
// Use styled-components
// use standard ui components (no material ui/bootstrap)
// Can use redux but I'm doubtful it will be needed
// can use webpack, but not sure if I need to bother with changing the standard CRA webpack
// unit test for atleast two files, show why you tested them and how you tested them

// Components/design
// main page:
// switch filter for all/saved
// search box
// detail page
// shows image, height, weight, type and mock description
// has a switch for saving(bagging) pokemon
// lists abilities -> all this under detailedPokemon component
// display google maps location -> map component? -> https://www.npmjs.com/package/google-map-react

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
      min: 0,
      max: 0,
    };
  }

  // componentDidMount() {
  //   this.loadPokemon(1, 25);
  // }

  loadPokemon(newMin, newMax) {
    // loading function for when scrolling
    let promises = [];
    // need to make max doesn't pass 151 so we don't 2nd Gen pokemon
    const safeMax = newMax > 151 ? 151 : newMax;

    // grab this set of pokemon
    for (let i = newMin; i < safeMax + 1; i++) {
      promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`));
    }

    Promise.all(promises).then(values => {
      const data = values.map(val => val.data);
      this.setState(prevState => ({
        pokemon: [...prevState.pokemon, ...data],
        min: newMin,
        max: safeMax,
      }));
    });
  }

  render() {
    const { max, pokemon } = this.state;
    console.log(pokemon);
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={() => this.loadPokemon(max + 1, max + 25)}
        hasMore={max < 151}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }>
        <PokemonList>
          {this.state.pokemon.map(pokemon => {
            return (
              <PokemonContainer>
                <Pokemon
                  key={pokemon.id}
                  name={pokemon.name}
                  imgUrl={pokemon.sprites.front_default}
                />
              </PokemonContainer>
            );
          })}
        </PokemonList>
      </InfiniteScroll>
    );
  }
}

export default App;
