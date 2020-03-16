import React from 'react';
import axios from 'axios';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import PokemonOverview from '../PokemonOverview';

afterEach(cleanup);

test('search filters correctly', async () => {
  const { queryByText, queryAllByPlaceholderText } = render(
    <Router>
      <PokemonOverview pokemonList={dummyList} max={0} />
    </Router>
  );

  const input = queryAllByPlaceholderText(/search/i)[0];
  fireEvent.change(input, { target: { value: 'bulba' } });
  // bulbasaur is correctly allowed
  expect(queryByText(/bulbasaur/i)).toBeDefined();

  // charmander is correctly filtered out
  expect(queryByText(/charmander/i)).toBeNull();
});

const dummyList = [
  {
    id: 1,
    name: 'bulbasaur',
    order: 1,
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
  },
  {
    id: 4,
    name: 'charmander',
    order: 1,
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
  },
  {
    id: 7,
    name: 'squirtle',
    order: 1,
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
  },
];
