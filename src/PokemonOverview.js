import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Pokemon from './Pokemon';

const PokemonOverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListContainer = styled.div`
  height: 500px;
  min-width: 350px;
  overflow: auto;
`;

const PokemonList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 10%;
  justify-content: space-between;
`;

const PokemonContainer = styled.div`
  width: 20%;
`;

const ButtonContainer = styled.div`
  margin: 5% 0 0 0;
`;

const FilterButton = styled.button`
  background: ${props => (props.active ? 'lightBlue' : 'white')};
`;

const SearchBox = styled.input`
  margin: 1% 0 5% 0;
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

class PokemonOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bagFilter: false,
      searchFilter: '',
    };
  }

  setBagFilter(value) {
    this.setState({ bagFilter: value });
  }

  updateSearchFilter(value) {
    this.setState({ searchFilter: value });
  }

  showPokemon(name, id) {
    const { bagFilter, searchFilter } = this.state;
    const bag = JSON.parse(localStorage.getItem('bag'));

    if (name.includes(searchFilter)) {
      if (bagFilter) {
        if (bag.includes(id.toString())) {
          // passed search and bag filter
          return true;
        } else {
          // failed bag filter
          return false;
        }
      } else {
        // passed search filter, and theres no bag filter
        return true;
      }
    } else {
      // failed search filter
      return false;
    }
  }

  render() {
    const { bagFilter, searchFilter } = this.state;
    const { pokemonList, max, loadMore } = this.props;
    console.log(pokemonList);
    return (
      <PokemonOverviewContainer>
        <ButtonContainer>
          <FilterButton
            active={!bagFilter}
            onClick={() => this.setBagFilter(false)}>
            ALL
          </FilterButton>
          <FilterButton
            active={bagFilter}
            onClick={() => this.setBagFilter(true)}>
            BAG
          </FilterButton>
        </ButtonContainer>
        <SearchBox
          type="text"
          placeholder="search"
          value={searchFilter}
          onChange={e => this.updateSearchFilter(e.target.value)}
        />
        <ListContainer>
          <InfiniteScroll
            pageStart={0}
            loadMore={() => loadMore(max + 1, max + 15)}
            hasMore={max < 151}
            useWindow={false}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }>
            <PokemonList>
              {pokemonList.map(pokemon => {
                return (
                  this.showPokemon(pokemon.name, pokemon.id) && (
                    <PokemonContainer key={pokemon.id}>
                      <Pokemon
                        name={pokemon.name}
                        imgUrl={pokemon.sprites.front_default}
                        id={pokemon.id}
                      />
                    </PokemonContainer>
                  )
                );
              })}
            </PokemonList>
          </InfiniteScroll>
        </ListContainer>
      </PokemonOverviewContainer>
    );
  }
}

export default PokemonOverview;

PokemonOverview.propTypes = {
  pokemonList: PropTypes.array.isRequired,
  max: PropTypes.number.isRequired,
};
