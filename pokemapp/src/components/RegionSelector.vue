<template>
  <div class="region-selector">
    <label class="selector-label">Seleccionar región:</label>
    <select v-model="selectedRegionValue" class="region-select">
      <option 
        v-for="(info, region) in regions" 
        :key="region" 
        :value="region"
      >
        {{ formatRegionName(region) }} (Gen {{ info.gen }})
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'RegionSelector',
  props: {
    value: {
      type: String,
      required: true
    },
    regions: {
      type: Object,
      required: true
    }
  },
  computed: {
    selectedRegionValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
  methods: {
    formatRegionName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  }
};
</script>

<style scoped>
.region-selector {
  margin: 15px 0;
  display: flex;
  align-items: center;
}

.selector-label {
  margin-right: 10px;
  font-weight: 500;
}

.region-select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 14px;
  min-width: 180px;
}
</style>