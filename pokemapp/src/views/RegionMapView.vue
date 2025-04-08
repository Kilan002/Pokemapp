<template>
  <div class="region-map-view">
    <h1>Mapa de Regiones Pokémon</h1>
    
    <pokemon-search @search="searchPokemon" />
    
    <loading-spinner v-if="loading" text="Buscando Pokémon..." />
    
    <error-message 
      v-if="error" 
      :message="error" 
      show-retry 
      @retry="retryLastSearch" 
    />
    
    <div v-if="pokemon && !loading" class="pokemon-content">
      <pokemon-basic :pokemon="pokemon" :species="species" />
      
      <region-map 
        :locations="locations" 
        :initial-region="getDefaultRegion()" 
        title="Mapa de Regiones" 
      />
    </div>
  </div>
</template>

<script>
import PokemonSearch from '@/components/PokemonSearch.vue';
import PokemonBasic from '@/components/PokemonBasic.vue';
import RegionMap from '@/components/RegionMap.vue';
import LocationList from '@/components/LocationList.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';

export default {
  name: 'RegionMapView',
  components: {
    PokemonSearch,
    PokemonBasic,
    RegionMap,
    LocationList,
    LoadingSpinner,
    ErrorMessage
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
    },
    
    getDefaultRegion() {
      // Si tenemos información de especie, usamos la región nativa
      if (this.species && this.species.generation) {
        const genMap = {
          'generation-i': 'kanto',
          'generation-ii': 'johto',
          'generation-iii': 'hoenn',
          'generation-iv': 'sinnoh',
          'generation-v': 'unova',
          'generation-vi': 'kalos',
          'generation-vii': 'alola',
          'generation-viii': 'galar'
        };
        return genMap[this.species.generation.name] || 'kanto';
      }
      return 'kanto'; // Región por defecto
    }
  }
};
</script>

<style scoped>
.region-map-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.pokemon-content {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>