<template>
  <div class="region-map-section">
    <h3 class="map-title">{{ title }}</h3>
    
    <region-selector 
      :value="selectedRegion"
      @input="updateSelectedRegion"
      :regions="regionInfo"
    />
    
    
    <div class="region-map-container">
      <div class="region-map" :style="regionMapStyle">
        <!-- Overlay con nombre de la región -->
        <div class="region-overlay">
          <div class="region-name">{{ formatName(selectedRegion) }}</div>
        </div>
        
        <!-- Puntos de ubicación -->
        <div 
          v-for="(location, index) in filteredLocations" 
          :key="index" 
          class="location-marker"
          :style="getRegionPositionStyle(location)"
          @mouseover="activeLocation = location"
          @mouseleave="activeLocation = null"
        >
          <span class="location-pin"></span>
          <div v-if="activeLocation === location" class="location-info">
            {{ formatName(location.location_area.name) }}
          </div>
        </div>
      </div>
      
      <div v-if="filteredLocations.length === 0" class="no-locations-message">
        No se han encontrado ubicaciones para este Pokémon en la región {{ formatName(selectedRegion) }}
      </div>
    </div>
    <!-- Mostrar lista de ubicaciones -->
    <location-list 
      :locations="filteredLocations" 
      :title="`Ubicaciones en ${formatName(selectedRegion)}`" 
      show-versions
    />
    
    <!-- Mostrar región seleccionada para debug -->
    <!-- <div class="debug-info">
      Región actual: {{ selectedRegion }}
    </div> -->
  </div>
</template>

<script>
import RegionSelector from './RegionSelector.vue';
import LocationList from './LocationList.vue';

export default {
  name: 'RegionMap',
  components: {
    RegionSelector,
    LocationList
  },
  props: {
    locations: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: 'Mapa de Regiones'
    },
    initialRegion: {
      type: String,
      default: 'kanto'
    }
  },
  data() {
    return {
      selectedRegion: this.initialRegion,
      activeLocation: null,
      regionInfo: {
        kanto: { 
          gen: 1, 
          versions: ['red', 'blue', 'yellow', 'firered', 'leafgreen', 'lets-go-pikachu', 'lets-go-eevee'],
          image: 'https://example.com/images/kanto-map.png',
          backgroundColor: '#7CB9E8'
        },
        johto: { 
          gen: 2, 
          versions: ['gold', 'silver', 'crystal', 'heartgold', 'soulsilver'],
          image: 'https://example.com/images/johto-map.png',
          backgroundColor: '#7FC8A9'
        },
        hoenn: { 
          gen: 3, 
          versions: ['ruby', 'sapphire', 'emerald', 'omega-ruby', 'alpha-sapphire'],
          image: 'https://example.com/images/hoenn-map.png',
          backgroundColor: '#FFB347'
        },
        sinnoh: { 
          gen: 4, 
          versions: ['diamond', 'pearl', 'platinum'],
          image: 'https://example.com/images/sinnoh-map.png',
          backgroundColor: '#B19CD9'
        },
        unova: { 
          gen: 5, 
          versions: ['black', 'white', 'black-2', 'white-2'],
          image: 'https://example.com/images/unova-map.png',
          backgroundColor: '#DEA5A4'
        },
        kalos: { 
          gen: 6, 
          versions: ['x', 'y'],
          image: 'https://example.com/images/kalos-map.png',
          backgroundColor: '#AEC6CF'
        },
        alola: { 
          gen: 7, 
          versions: ['sun', 'moon', 'ultra-sun', 'ultra-moon'],
          image: 'https://example.com/images/alola-map.png',
          backgroundColor: '#77DD77'
        },
        galar: { 
          gen: 8, 
          versions: ['sword', 'shield'],
          image: 'https://example.com/images/galar-map.png',
          backgroundColor: '#FF6961'
        },
        paldea: {
          gen: 9,
          versions: ['scarlet', 'violet'],
          image: 'https://example.com/images/paldea-map.png',
          backgroundColor: '#FF9E80'
        }
      },
      isImageLoaded: false,
      imageError: false
    };
  },
  computed: {
    filteredLocations() {
      if (!this.locations.length) return [];
      
      console.log(`Filtrando ubicaciones para región: ${this.selectedRegion}`);
      
      // Filtra ubicaciones basadas en las versiones de la región seleccionada
      const regionVersions = this.regionInfo[this.selectedRegion]?.versions || [];
      
      const filtered = this.locations.filter(location => {
        return location.version_details.some(vd => 
          regionVersions.includes(vd.version.name)
        );
      });
      
      console.log(`Encontradas ${filtered.length} ubicaciones para la región ${this.selectedRegion}`);
      return filtered;
    },
    
    currentRegionImage() {
      return this.regionInfo[this.selectedRegion]?.image || '';
    },
    
    currentRegionBackgroundColor() {
      return this.regionInfo[this.selectedRegion]?.backgroundColor || '#e9f7ef';
    },
    
    regionMapStyle() {
      return {
        backgroundImage: `url('${this.currentRegionImage}')`,
        backgroundColor: this.currentRegionBackgroundColor,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
  },
  watch: {
    selectedRegion(newRegion, oldRegion) {
      console.log(`Región cambiada de ${oldRegion} a ${newRegion}`);
      
      // Resetear estados de imagen cuando cambia la región
      this.isImageLoaded = false;
      this.imageError = false;
      
      // Precargar la imagen
      this.preloadImage(this.currentRegionImage);
      
      // Emitir evento para notificar cambio de región
      this.$emit('region-changed', newRegion);
    },
    
    // También observa cambios en initialRegion en caso de que se actualice desde fuera
    initialRegion(newRegion) {
      if (newRegion !== this.selectedRegion) {
        this.selectedRegion = newRegion;
      }
    }
  },
  mounted() {
    // Precargar la imagen de la región inicial
    this.preloadImage(this.currentRegionImage);
    console.log(`Componente montado con región inicial: ${this.selectedRegion}`);
  },
  methods: {
    updateSelectedRegion(region) {
      console.log(`Actualizando región a: ${region}`);
      if (this.regionInfo[region]) {
        this.selectedRegion = region;
      } else {
        console.warn(`Región desconocida: ${region}`);
      }
    },
    
    formatName(name) {
      if (!name) return '';
      return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    },
    
    getRegionPositionStyle(location) {
      // Crear posiciones pseudo-aleatorias pero consistentes para cada ubicación
      const locationName = location.location_area.name;
      const hash = this.hashString(locationName);
      
      // Distribuir los puntos en el mapa basados en el hash
      const x = (hash % 70) + 15; // 15% a 85%
      const y = ((hash * 13) % 70) + 15; // 15% a 85%
      
      return {
        left: `${x}%`,
        top: `${y}%`
      };
    },
    
    hashString(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash;
      }
      return Math.abs(hash);
    },
    
    setRegion(region) {
      this.updateSelectedRegion(region);
    },
    
    preloadImage(src) {
      if (!src) return;
      
      const img = new Image();
      img.onload = () => {
        this.isImageLoaded = true;
        this.imageError = false;
      };
      img.onerror = () => {
        this.imageError = true;
        console.warn(`No se pudo cargar la imagen de la región: ${src}`);
      };
      img.src = src;
    }
  }
};
</script>

<style scoped>
.region-map-section {
  margin: 20px 0;
}

.map-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.region-map-container {
  position: relative;
  width: 100%;
  margin-bottom: 25px;
}

.region-map {
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #333;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
}

.region-overlay {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 4px;
  font-weight: bold;
}

.location-marker {
  position: absolute;
  z-index: 5;
  transform: translate(-50%, -50%);
}

.location-pin {
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #d32f2f;
  border: 2px solid white;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.location-info {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  margin-bottom: 8px;
  pointer-events: none;
}

.no-locations-message {
  text-align: center;
  padding: 10px;
  font-style: italic;
  color: #666;
  margin-top: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
  border: 1px dashed #ddd;
}

.debug-info {
  font-size: 12px;
  color: #666;
  background-color: #f8f8f8;
  padding: 5px;
  border-radius: 4px;
  margin-top: 5px;
}
</style>