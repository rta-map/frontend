<script setup lang="ts">
import { ref } from 'vue'
import MapView from '@/components/MapView.vue'
import FilterPanel from '@/components/FilterPanel.vue'
import { useAccidentsStore } from '@/stores/accidents'

const store = useAccidentsStore()
const mapViewRef = ref<InstanceType<typeof MapView> | null>(null)

// When filters change, re-fetch using the map's current bbox
// MapView watches store.geojson so we just need to trigger load with current bbox.
// We expose a refetch mechanism via the store — MapView already debounces on move/zoom,
// so we signal by incrementing a trigger that MapView watches.
const refetchTrigger = ref(0)

function onRefetch() {
  refetchTrigger.value++
}
</script>

<template>
  <div class="home">
    <FilterPanel @refetch="onRefetch" />
    <div class="map-wrapper">
      <MapView :refetch-trigger="refetchTrigger" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  width: 100%;
}
.map-wrapper {
  flex: 1;
  overflow: hidden;
}
</style>
