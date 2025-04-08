<template>
  <nav class="app-navigation">
    <div class="nav-logo">
      <img src="/pokeball-icon.png" alt="Pokémon" class="logo-img">
      <span class="logo-text">PokéMapp</span>
    </div>
    
    <div class="nav-links">
      <router-link to="/" class="nav-link" exact>
        Mapa de Regiones
      </router-link>
      <router-link to="/moves" class="nav-link">
        Lista de movimientos 
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavigation'
};
</script>

<style scoped>
.app-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ef5350;
  color: white;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.nav-logo {
  display: flex;
  align-items: center;
}

.logo-img {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
}

.nav-links {
  display: flex;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 8px 15px;
  margin-left: 10px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-link.router-link-active {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>