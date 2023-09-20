import React from 'react';

function Card({ pokemonData }) {
  const hp = pokemonData.stats[0].base_stat;
  const attack = pokemonData.stats[1].base_stat;

  return (
    <div className="pokemon-card">
      <div className="pokemon-card-image">
        <img
          src={pokemonData.sprites.front_default}
          alt={pokemonData.name}
        />
      </div>
      <div className="pokemon-card-details">
        <h1>{pokemonData.name}</h1>
        <p><strong>Vida:</strong> {hp}</p>
        <p><strong>Ataque:</strong> {attack}</p>
        <p><strong>Poderes:</strong></p>
        <ul>
          {pokemonData.abilities.map(ability => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Card;
