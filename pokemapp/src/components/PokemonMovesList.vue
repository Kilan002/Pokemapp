<template>
  <div class="moves-section">
    <h3 class="moves-title">{{ title }}</h3>
    <div v-if="moves.length === 0" class="no-moves">
      No hay movimientos disponibles para este Pokémon.
    </div>
    <div v-else class="moves-slider-container">
      <button 
        class="slider-btn prev-btn" 
        @click="prevPage" 
        :disabled="currentPage === 0"
      >
        &laquo;
      </button>
      
      <div class="moves-list-container">
        <ul class="moves-list">
          <li v-for="move in paginatedMoves" :key="move.move.name" class="move-item">
            <div class="move-details">
              <span class="move-name">{{ formatMoveName(move.move.name) }}</span>
              <span v-if="move.version_group_details && move.version_group_details.length" class="move-level">
                Nivel: {{ move.version_group_details[0].level_learned_at || 'TM/HM' }}
              </span>
            </div>
          </li>
        </ul>
      </div>
      
      <button 
        class="slider-btn next-btn" 
        @click="nextPage" 
        :disabled="currentPage >= totalPages - 1"
      >
        &raquo;
      </button>
    </div>
    
    <div v-if="moves.length > 0" class="pagination-info">
      Página {{ currentPage + 1 }} de {{ totalPages }} 
      ({{ moves.length }} movimientos totales)
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokemonMovesList',
  props: {
    moves: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: 'Lista de Movimientos'
    },
    itemsPerPage: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      currentPage: 0
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.moves.length / this.itemsPerPage);
    },
    paginatedMoves() {
      const start = this.currentPage * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.moves.slice(start, end);
    }
  },
  methods: {
    formatMoveName(name) {
      // Formatear el nombre del movimiento para que sea más legible
      return name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    },
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    }
  }
};
</script>

<style scoped>
.moves-section {
  margin: 20px 0;
  max-width: 600px;
}

.moves-title {
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
  text-align: center;
}

.no-moves {
  font-style: italic;
  color: #666;
  padding: 10px;
  text-align: center;
  background-color: #f8f8f8;
  border-radius: 6px;
}

.moves-slider-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}

.moves-list-container {
  flex-grow: 1;
  overflow: hidden;
  margin: 0 10px;
}

.moves-list {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.move-item {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.2s;
  cursor: pointer;
}

.move-item:last-child {
  border-bottom: none;
}

.move-item:hover {
  background-color: #e8e8e8;
}

.move-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.move-name {
  font-weight: 500;
  color: #2c3e50;
}

.move-level {
  font-size: 0.9em;
  color: #666;
  background-color: #e2e2e2;
  padding: 2px 6px;
  border-radius: 4px;
}

.slider-btn {
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.slider-btn:hover:not(:disabled) {
  background-color: #2980b9;
}

.slider-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.pagination-info {
  text-align: center;
  font-size: 0.9em;
  color: #666;
  margin-top: 8px;
}
</style>