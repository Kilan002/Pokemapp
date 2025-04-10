<template>
  <header class="header">
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
  </header>
</template>

<script>
export default {
  name: 'AppNavigation'
};
</script>

<style scoped>
.header {
  position: fixed;  /* Fija el encabezado en la parte superior */
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;  /* Asegura que el encabezado esté por encima del resto del contenido */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(45deg, #ef5350, #d32f2f);
  color: white;
  padding: 15px 30px;
  border-radius: 0 0 12px 12px;  /* Redondeo solo las esquinas inferiores */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.header:hover {
  background: linear-gradient(45deg, #d32f2f, #ef5350);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-img {
  width: 40px;
  height: 40px;
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.nav-links {
  display: flex;
  gap: 30px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.nav-link.router-link-active {
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
}

/* Asegúrate de que el contenido no se superponga al encabezado */
body {
  margin-top: 80px;  /* Ajusta el margen superior según el tamaño de tu encabezado */
}
</style>
