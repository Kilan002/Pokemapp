import { createRouter, createWebHistory } from 'vue-router';

// Importa tus vistas o componentes
import PokemonMapView from '../views/PokemonListView.vue';
import RegionMapView from '../views/RegionMapView.vue';

const routes = [
  {
    path: '/moves',
    name: 'Inicio',
    component: PokemonMapView
  },
  {
    path: '/',
    name: 'RegionMapView',
    component: RegionMapView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
