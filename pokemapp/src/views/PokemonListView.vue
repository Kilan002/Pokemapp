<template>
  <div class="pokemon-map-view">
    <h1>Lista de movimientos </h1>
    
    <pokemon-search @search="searchPokemon" />
    
    <loading-spinner v-if="loading" text="Buscando Pokémon..." />
    
    <error-message 
      v-if="error" 
      :message="error" 
      show-retry 
      @retry="retryLastSearch" 
    />
    
    <div v-if="pokemon && !loading">
      <pokemon-basic :pokemon="pokemon" :species="species" />
      
      <pokemon-moves-list 
        :moves="pokemon.moves" 
        title="Lista de Movimientos"
      />
    </div>
  </div>
</template>

<script>
import PokemonSearch from '@/components/PokemonSearch.vue';
import PokemonBasic from '@/components/PokemonBasic.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import PokemonMovesList from '@/components/PokemonMovesList.vue';

export default {
  name: 'PokemonMapView',
  components: {
    PokemonSearch,
    PokemonBasic,
    LoadingSpinner,
    ErrorMessage,
    PokemonMovesList
  },
  data() {
    return {
      pokemon: null,
      species: null,
      locations: [],
      loading: false,
      error: null,
      lastSearchTerm: ''
    };
  },
  methods: {
    async searchPokemon(term) {
      this.loading = true;
      this.error = null;
      this.lastSearchTerm = term;
      
      try {
        // Convertir a minúsculas y eliminar espacios
        const normalizedTerm = term.toLowerCase().trim();
        
        // Obtener datos básicos del Pokémon
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${normalizedTerm}`);
        if (!pokemonResponse.ok) {
          throw new Error('No se pudo encontrar ese Pokémon. Verifica el nombre o ID.');
        }
        this.pokemon = await pokemonResponse.json();
        
        // Obtener datos de la especie
        const speciesResponse = await fetch(this.pokemon.species.url);
        if (speciesResponse.ok) {
          this.species = await speciesResponse.json();
        }
        
        // Obtener datos de las ubicaciones
        const locationsResponse = await fetch(this.pokemon.location_area_encounters);
        if (locationsResponse.ok) {
          this.locations = await locationsResponse.json();
        } else {
          this.locations = [];
        }
      } catch (err) {
        this.error = err.message || 'Ha ocurrido un error al buscar el Pokémon';
        this.pokemon = null;
        this.species = null;
        this.locations = [];
      } finally {
        this.loading = false;
      }
    },
    
    retryLastSearch() {
      if (this.lastSearchTerm) {
        this.searchPokemon(this.lastSearchTerm);
      }
    }
  }
};
</script>

<style scoped>
.pokemon-map-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}
</style>