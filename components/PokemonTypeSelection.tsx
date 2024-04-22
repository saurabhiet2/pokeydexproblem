// components/PokemonTypeSelection.tsx
import React from 'react';

interface PokemonTypeSelectionProps {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
}

const PokemonTypeSelection: React.FC<PokemonTypeSelectionProps> = ({
  selectedType,
  selectType,
}) => {
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectType(e.target.value === 'All' ? undefined : e.target.value);
  };

  return (
    <div>
      <label htmlFor="pokemonType">Select Pokémon Type:</label>
      <select id="pokemonType" value={selectedType || 'All'} onChange={handleTypeChange}>
        <option value="All">All</option>
        <option value="grass">Grass</option>
        <option value="fire">Fire</option>
        
        {/* Add more options for other Pokémon types */}
      </select>
    </div>
  );
};

export default PokemonTypeSelection;
