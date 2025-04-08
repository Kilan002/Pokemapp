<template>
  <div class="loading-container">
    <div class="pokeball-spinner"></div>
    <p v-if="text" class="loading-text">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    text: {
      type: String,
      default: 'Cargando...'
    }
  }
};
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.pokeball-spinner {
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  border: 3px solid #333;
  animation: spin 1.5s linear infinite;
}

.pokeball-spinner:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 50%;
  background-color: #f00;
  top: 0;
  left: 0;
}

.pokeball-spinner:after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: #fff;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 3px solid #333;
  z-index: 5;
}

.loading-text {
  margin-top: 15px;
  font-style: italic;
  color: #666;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>