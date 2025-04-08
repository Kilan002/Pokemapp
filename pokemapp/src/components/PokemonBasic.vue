<template>
  <div class="pokemon-card">
    <div class="pokemon-basic">
      <img 
        :src="pokemon.sprites.front_default" 
        :alt="pokemon.name" 
        class="pokemon-sprite"
      />
      
      <div class="pokemon-info">
        <h2 class="pokemon-name">{{ formatName(pokemon.name) }}</h2>
        <span class="pokemon-id">#{{ formatId(pokemon.id) }}</span>
        
        <div class="pokemon-types">
          <span 
            v-for="type in pokemon.types" 
            :key="type.slot" 
            class="type" 
            :class="type.type.name"
          >
            {{ formatName(type.type.name) }}
          </span>
        </div>
      </div>
    </div>
    
    <div v-if="species" class="species-info">
      <div class="info-row">
        <span class="info-label">Generación:</span>
        <span class="info-value">{{ formatGeneration(species.generation.name) }}</span>
      </div>
      
      <div class="info-row">
        <span class="info-label">Región:</span>
        <span class="info-value">{{ getNativeRegion(species.generation.name) }}</span>
      </div>
      
      <!-- <div class="info-row">
        <span class="info-label">Color:</span>
        <span class="info-value">{{ formatName(species.color.name) }}</span>
      </div> -->
      
      <div class="info-row">
        <span class="info-label">Hábitat:</span>
        <span class="info-value">{{ species.habitat ? formatName(species.habitat.name) : 'Desconocido' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokemonBasic',
  props: {
    pokemon: {
      type: Object,
      required: true
    },
    species: {
      type: Object,
      default: null
    }
  },
  methods: {
    formatName(name) {
      if (!name) return '';
      return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    },
    
    formatId(id) {
      return id.toString().padStart(3, '0');
    },
    
    formatGeneration(genName) {
      if (!genName) return '';
      const parts = genName.split('-');
      if (parts.length >= 2) {
        return `Generación ${parts[1].toUpperCase()}`;
      }
      return genName;
    },
    
    getNativeRegion(genName) {
      if (!genName) return 'Desconocida';
      
      const genMap = {
        'generation-i': 'Kanto',
        'generation-ii': 'Johto',
        'generation-iii': 'Hoenn',
        'generation-iv': 'Sinnoh',
        'generation-v': 'Unova',
        'generation-vi': 'Kalos',
        'generation-vii': 'Alola',
        'generation-viii': 'Galar',
        'generation-ix': 'Paldea'
      };
      
      return genMap[genName] || 'Desconocida';
    }
  }
};
</script>

<style scoped>
.pokemon-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  background-color: #fff;
}

.pokemon-basic {
  display: flex;
  align-items: center;
}

.pokemon-sprite {
  width: 120px;
  height: 120px;
  image-rendering: pixelated;
}

.pokemon-info {
  margin-left: 20px;
}

.pokemon-name {
  font-size: 24px;
  margin: 0;
}

.pokemon-id {
  font-size: 18px;
  color: #666;
  margin-left: 8px;
}

.pokemon-types {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.type {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 14px;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
}

/* Estilos para tipos de Pokémon */
.normal { background-color: #A8A878; }
.fire { background-color: #F08030; }
.water { background-color: #6890F0; }
.grass { background-color: #78C850; }
.electric { background-color: #F8D030; }
.ice { background-color: #98D8D8; }
.fighting { background-color: #C03028; }
.poison { background-color: #A040A0; }
.ground { background-color: #E0C068; }
.flying { background-color: #A890F0; }
.psychic { background-color: #F85888; }
.bug { background-color: #A8B820; }
.rock { background-color: #B8A038; }
.ghost { background-color: #705898; }
.dark { background-color: #705848; }
.dragon { background-color: #7038F8; }
.steel { background-color: #B8B8D0; }
.fairy { background-color: #EE99AC; }

.species-info {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border-left: 5px solid #2196f3;
}

.info-row {
  display: flex;
  margin: 8px 0;
}

.info-label {
  font-weight: bold;
  min-width: 100px;
}

.info-value {
  color: #333;
}
</style>