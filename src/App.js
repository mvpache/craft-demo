import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import PokemonOverview from './PokemonOverview';
import PokemonDetail from './PokemonDetail';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonList: [],
      max: 0,
      activeId: '0',
    };
  }

  loadPokemon(min, newMax) {
    // loading function for when scrolling
    let promises = [];
    // need to make max doesn't pass 151 so we don't 2nd Gen pokemon

    const safeMax = newMax > 151 ? 151 : newMax;
    // grab this set of pokemon
    for (let i = min; i < safeMax + 1; i++) {
      promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`));
    }

    Promise.all(promises).then(values => {
      const data = values.map(val => val.data);
      this.setState(prevState => ({
        pokemonList: [...prevState.pokemonList, ...data],
        max: safeMax,
      }));
    });
  }

  render() {
    const { pokemonList, max } = this.state;
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={() => (
              <PokemonOverview
                pokemonList={pokemonList}
                loadMore={(min, newMax) => this.loadPokemon(min, newMax)}
                max={max}
              />
            )}
          />
          <Route
            path="/detail/:id"
            render={routeProps => (
              <PokemonDetail {...routeProps} pokemonList={pokemonList} />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
