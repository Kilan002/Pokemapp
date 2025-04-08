<template>
  <div class="location-list-container">
    <h3 class="list-title">{{ title }}</h3>
    
    <div v-if="locations.length === 0" class="no-locations">
      No hay ubicaciones disponibles para este Pokémon
    </div>
    
    <ul v-else class="location-list">
      <li v-for="(location, index) in locations" :key="index" class="location-item">
        <span class="location-name">{{ formatName(location.location_area.name) }}</span>
        <span v-if="showVersions && location.version_details.length > 0" class="version-info">
          ({{ formatVersions(location.version_details) }})
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LocationList',
  props: {
    locations: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: 'Ubicaciones'
    },
    showVersions: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    formatName(name) {
      if (!name) return '';
      return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    },
    
    formatVersions(versionDetails) {
      if (!versionDetails || versionDetails.length === 0) return '';
      
      return versionDetails
        .slice(0, 3)
        .map(v => this.formatName(v.version.name))
        .join(', ') + (versionDetails.length > 3 ? '...' : '');
    }
  }
};
</script>

<style scoped>
.location-list-container {
  margin: 20px 0;
}

.list-title {
  font-size: 18px;
  margin-bottom: 10px;
  border-bottom: 2px solid #eee;
  padding-bottom: 5px;
}

.no-locations {
  font-style: italic;
  color: #666;
  padding: 10px;
}

.location-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 250px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 5px;
}

.location-item {
  padding: 8px 12px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.location-item:last-child {
  border-bottom: none;
}

.location-item:hover {
  background-color: #f5f5f5;
}

.location-name {
  font-weight: 500;
}

.version-info {
  font-size: 12px;
  color: #666;
}
</style>