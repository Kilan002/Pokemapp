<template>
  <div id="app">
    <app-navigation  />
    <router-view />
  </div>
</template>

<script>
import AppNavigation from '@/components/AppNavigation.vue';

export default {
  name: 'App',
  components: {
    AppNavigation
  }
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

#app {
  min-height: 100vh;
  background-color: #f8f8f8;
}

/* Estilo general para todos los botones */
button {
  cursor: pointer;
  font-family: inherit;
}

/* Estilos para enlaces generales */
a {
  color: #2196f3;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>