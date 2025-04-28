<template>
  <div class="region-map-view">
    <h1>Mapa de Regiones Pokémon</h1>
    
    <pokemon-search @search="searchPokemon"/>
    
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
  width: 400%;
  max-width: 1150px;
  width: 100%;
  max-width: 900px;

  margin-top: 25% ;
  margin: 10 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #fafafa;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  margin-top: 1%;
  font-weight: bold;
}

.pokemon-content {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.pokemon-search, .loading-spinner, .error-message {
  margin-bottom: 20px;
}

.loading-spinner {
  text-align: center;
  color: #555;
  font-size: 1.2rem;
}

.error-message {
  background-color: #f8d7da;
  border-radius: 8px;
  padding: 15px;
  color: #721c24;
  font-size: 1.1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.error-message .retry-button {
  background-color: #ff6b6b;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.error-message .retry-button:hover {
  background-color: #e74c3c;
}

.region-map {
  margin-top: 30px;
  width: 100%;
  overflow-x: auto;
}

/* Media queries para diferentes tamaños de pantalla */
@media (max-width: 992px) {
  .region-map-view {
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
  }
  
  h1 {
    font-size: 2.2rem;
  }
}

@media (max-width: 768px) {
  .region-map-view {
    max-width: 95%;
    padding: 15px;
    margin-top: 30px;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .pokemon-content {
    padding: 20px;
  }
}

@media (max-width: 576px) {
  .region-map-view {
    max-width: 100%;
    border-radius: 8px;
    margin-top: 20px;
  }
  
  h1 {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
  
  .pokemon-content {
    padding: 15px;
  }
  
  .error-message {
    font-size: 1rem;
    padding: 12px;
  }
}
</style>
