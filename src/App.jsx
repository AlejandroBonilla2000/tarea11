import React, { useEffect, useState } from 'react';
import Card from './Card'; // Importa el componente de tarjeta
import './App.css'; // Importa el archivo CSS

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // URL de la API a la que deseas hacer la solicitud
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
    const limit = 25; // Cantidad de Pokémones por página
    const totalPokemon = 600; // Cambia este valor al número total de Pokémones que desees mostrar

    // Realiza solicitudes para obtener todos los Pokémones
    const getPokemonData = async () => {
      const allPokemonData = [];

      for (let offset = 0; offset < totalPokemon; offset += limit) {
        const response = await fetch(`${apiUrl}?limit=${limit}&offset=${offset}`);
        if (!response.ok) {
          throw new Error(`Hubo un problema con la solicitud: ${response.status}`);
        }
        const data = await response.json();
        allPokemonData.push(...data.results);
      }

      // Realiza solicitudes individuales para obtener los detalles de cada Pokémon
      const pokemonPromises = allPokemonData.map((pokemon) =>
        fetch(pokemon.url).then((response) => response.json())
      );

      // Espera a que se resuelvan todas las promesas
      return Promise.all(pokemonPromises);
    };

    getPokemonData()
      .then((pokemonDataArray) => {
        // Aquí puedes trabajar con los datos de los Pokémones
        setPokemonList(pokemonDataArray);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []); // El segundo argumento [] asegura que esta solicitud se realice solo una vez al montar el componente

  // Función para manejar cambios en el término de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrar la lista de Pokémon en función del término de búsqueda
  const filteredPokemonList = pokemonList.filter((pokemonData) =>
    pokemonData.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="pokemon-list">
          {filteredPokemonList.map((pokemonData) => (
            <Card key={pokemonData.id} pokemonData={pokemonData} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
