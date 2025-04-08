import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export default {
  // Obtener información básica de un Pokémon
  getPokemon(idOrName) {
    return axios.get(`${BASE_URL}/pokemon/${idOrName.toLowerCase()}`);
  },
  
  // Obtener información de la especie
  getSpecies(url) {
    return axios.get(url);
  },
  
  // Obtener ubicaciones donde aparece el Pokémon
  getLocations(pokemonId) {
    return axios.get(`${BASE_URL}/pokemon/${pokemonId}/encounters`);
  }
};