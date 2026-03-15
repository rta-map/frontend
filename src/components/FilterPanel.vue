<script setup lang="ts">
import { useAccidentsStore } from '@/stores/accidents'

const store = useAccidentsStore()

const emit = defineEmits<{ refetch: [] }>()

function onFilterChange() {
  emit('refetch')
}
</script>

<template>
  <div class="filter-panel">
    <div class="filter-group">
      <label>From</label>
      <input
        v-model="store.filters.date_from"
        type="date"
        @change="onFilterChange"
      />
    </div>
    <div class="filter-group">
      <label>To</label>
      <input
        v-model="store.filters.date_to"
        type="date"
        @change="onFilterChange"
      />
    </div>
    <div class="filter-group">
      <label>Type</label>
      <input
        v-model="store.filters.accident_type"
        type="text"
        placeholder="e.g. collision"
        @input="onFilterChange"
      />
    </div>
    <div class="filter-group">
      <label for="only-dead">With deaths only</label>
      <input
        id="only-dead"
        v-model="store.filters.only_dead"
        type="checkbox"
        @change="onFilterChange"
      />
    </div>
    <div v-if="store.loading" class="loading-indicator">Loading…</div>
    <div v-if="store.error" class="error-indicator">{{ store.error }}</div>
  </div>
</template>

<style scoped>
.filter-panel {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid #ddd;
  font-size: 13px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.filter-group label {
  font-weight: 600;
  color: #444;
  white-space: nowrap;
}

.filter-group input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 13px;
  outline: none;
}

.filter-group input:focus {
  border-color: #4a90d9;
}

.loading-indicator {
  color: #888;
  font-style: italic;
}

.error-indicator {
  color: #c00;
}
</style>
