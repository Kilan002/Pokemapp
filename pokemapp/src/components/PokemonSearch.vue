<template>
  <div class="search-container">
    <form @submit.prevent="search">
      <input 
        v-model="searchTerm" 
        type="text" 
        placeholder="Busca por nombre o ID del Pokémon"
        class="search-input"
      />
      <button type="submit" class="search-button">Buscar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PokemonSearch',
  data() {
    return {
      searchTerm: ''
    };
  },
  methods: {
    search() {
      if (!this.searchTerm.trim()) return;
      this.$emit('search', this.searchTerm.trim());
    }
  }
};
</script>

<style scoped>
.search-container {
  margin: 20px 0;
}

.search-input {
  padding: 10px;
  width: 30%;
  margin-left: 30%;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.search-button {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.search-button:hover {
  background-color: #0b7dda;
}
</style>