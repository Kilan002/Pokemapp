const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

const BASE_URL = 'https://pokeapi.co/api/v2';

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de Axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // Tiempo de espera de 5 segundos
});

// Rutas
/**
 * Obtener información de un Pokémon por ID o nombre
 */
app.get('/pokemon/:idOrName', async (req, res) => {
  try {
    const { idOrName } = req.params;
    if (!idOrName) {
      return res.status(400).json({ error: 'ID o nombre del Pokémon no proporcionado' });
    }
    const response = await axiosInstance.get(`/pokemon/${idOrName.toLowerCase()}`);
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'Pokémon no encontrado' });
    } else {
      res.status(500).json({ error: 'Error al obtener información del Pokémon' });
    }
  }
});

/**
 * Obtener información de una especie
 */
app.get('/species', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: 'URL de especie no proporcionada' });
    }
    const response = await axiosInstance.get(url);
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'Especie no encontrada' });
    } else {
      res.status(500).json({ error: 'Error al obtener información de la especie' });
    }
  }
});

/**
 * Obtener ubicaciones de un Pokémon por ID
 */
app.get('/locations/:pokemonId', async (req, res) => {
  try {
    const { pokemonId } = req.params;
    if (!pokemonId) {
      return res.status(400).json({ error: 'ID del Pokémon no proporcionado' });
    }
    const response = await axiosInstance.get(`/pokemon/${pokemonId}/encounters`);
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'Ubicaciones no encontradas para el Pokémon' });
    } else {
      res.status(500).json({ error: 'Error al obtener ubicaciones del Pokémon' });
    }
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});