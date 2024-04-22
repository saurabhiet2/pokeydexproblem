// pages/index.tsx
import PokemonTypeSelection from '../components/PokemonTypeSelection';

import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getPokemon, getPokemonArray } from '../api/pokemon';

const IndexPage: React.FC = () => {
  const [pokemonName, setPokemonName] = useState('');
  const { data: pokemon, isLoading } = useQuery(
    ['pokemon', pokemonName],
    () => getPokemon({ name: pokemonName }),
    {
      enabled: !!pokemonName,
    }
  );
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);

  const handleTypeSelection = (type: string | undefined) => {
    setSelectedType(type);
  };
  

  const [pokemonArrayInput, setPokemonArrayInput] = useState('');
  const { data: pokemonArray, isLoading: isLoadingArray } = useQuery(
    ['pokemonArray', pokemonArrayInput],
    () => getPokemonArray(pokemonArrayInput.split(',')),
    {
      enabled: !!pokemonArrayInput,
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonName(e.target.value);
  };

  const handleArrayInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPokemonArrayInput(e.target.value);
  };

  return (
    <div>
      <h1>Pokédex</h1>
      <form>
        <input
          type="text"
          placeholder="Enter Pokémon name"
          value={pokemonName}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <PokemonRow pokemon={pokemon} />
      )}
      <h2>Pokémon Array Search</h2>
      <form>
        <input
          type="text"
          placeholder="Enter Pokémon names separated by comma"
          value={pokemonArrayInput}
          onChange={handleArrayInputChange}
        />
        <button type="submit">Search</button>
      </form>
      {isLoadingArray ? (
        <p>Loading...</p>
      ) : (
        <PokedexTable pokemonArray={pokemonArray} />
      )}
    </div>
  );
};

interface PokemonProps {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

const PokemonRow: React.FC<{ pokemon: PokemonProps | undefined }> = ({
  pokemon,
}) => {
  if (!pokemon) return null;

  return (
    <div>
      <p>Name: {pokemon.name}</p>
      <p>ID: {pokemon.id}</p>
      <p>Types: {pokemon.types.join(', ')}</p>
      <img src={pokemon.sprite} alt={pokemon.name} />
    </div>
  );
};

const PokedexTable: React.FC<{ pokemonArray: PokemonProps[] }> = ({
  pokemonArray,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>ID</th>
          <th>Types</th>
          <th>Sprite</th>
        </tr>
      </thead>
      <tbody>
        {pokemonArray.map((pokemon) => (
          <tr key={pokemon.id}>
            <td>{pokemon.name}</td>
            <td>{pokemon.id}</td>
            <td>{pokemon.types.join(', ')}</td>
            <td>
              <img src={pokemon.sprite} alt={pokemon.name} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IndexPage;
