<template>
  <div class="error-container" v-if="message">
    <div class="error-icon">!</div>
    <div class="error-content">
      <h3 v-if="title" class="error-title">{{ title }}</h3>
      <p class="error-message">{{ message }}</p>
      <button v-if="showRetry" class="retry-button" @click="$emit('retry')">
        Intentar de nuevo
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    message: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: 'Error'
    },
    showRetry: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.error-container {
  display: flex;
  align-items: flex-start;
  padding: 15px;
  margin: 15px 0;
  background-color: #ffebee;
  border-left: 5px solid #f44336;
  border-radius: 4px;
}

.error-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: #f44336;
  color: white;
  border-radius: 50%;
  font-weight: bold;
  margin-right: 15px;
  flex-shrink: 0;
}

.error-content {
  flex: 1;
}

.error-title {
  margin: 0 0 5px 0;
  font-size: 18px;
  color: #d32f2f;
}

.error-message {
  margin: 0;
  color: #555;
}

.retry-button {
  margin-top: 10px;
  padding: 5px 15px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.retry-button:hover {
  background-color: #d32f2f;
}
</style>