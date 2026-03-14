<script setup lang="ts">
import { onMounted, onUnmounted, watch, ref } from 'vue'

const props = defineProps<{ refetchTrigger?: number }>()
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useAccidentsStore } from '@/stores/accidents'

const mapContainer = ref<HTMLDivElement | null>(null)
const store = useAccidentsStore()
let map: maplibregl.Map | null = null
let debounceTimer: ReturnType<typeof setTimeout> | null = null
let popup: maplibregl.Popup | null = null

function getBbox() {
  if (!map) return null
  const b = map.getBounds()
  return {
    min_lat: b.getSouth(),
    max_lat: b.getNorth(),
    min_lon: b.getWest(),
    max_lon: b.getEast(),
  }
}

function scheduleFetch() {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    const bbox = getBbox()
    if (bbox) store.load(bbox)
  }, 300)
}

function initLayers() {
  if (!map) return

  map.addSource('accidents-src', {
    type: 'geojson',
    data: { type: 'FeatureCollection', features: [] },
  })

  // Cluster circles
  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'accidents-src',
    filter: ['==', ['get', 'is_cluster'], true],
    paint: {
      'circle-radius': [
        'interpolate', ['linear'], ['get', 'count'],
        1, 8, 50, 18, 500, 28, 5000, 40,
      ],
      'circle-color': [
        'interpolate', ['linear'], ['get', 'count'],
        1, '#FFA500', 500, '#FF4500', 5000, '#8B0000',
      ],
      'circle-opacity': 0.8,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff',
    },
  })

  // Cluster count labels
  map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: 'accidents-src',
    filter: ['==', ['get', 'is_cluster'], true],
    layout: {
      'text-field': ['get', 'count'],
      'text-font': ['Open Sans Bold'],
      'text-size': 12,
    },
    paint: {
      'text-color': '#fff',
    },
  })

  // Individual pins
  map.addLayer({
    id: 'pins',
    type: 'circle',
    source: 'accidents-src',
    filter: ['==', ['get', 'is_cluster'], false],
    paint: {
      'circle-radius': 6,
      'circle-color': [
        'case',
        ['>', ['get', 'dead'], 0], '#CC0000',
        ['>', ['get', 'injured'], 0], '#FF8C00',
        '#888888',
      ],
      'circle-stroke-width': 1.5,
      'circle-stroke-color': '#fff',
      'circle-opacity': 0.9,
    },
  })

  // Cluster click → zoom in
  map.on('click', 'clusters', (e) => {
    const feature = e.features?.[0]
    if (!feature) return
    const coords = (feature.geometry as any).coordinates as [number, number]
    map!.flyTo({ center: coords, zoom: map!.getZoom() + 2 })
  })

  // Pin click → popup
  map.on('click', 'pins', (e) => {
    const feature = e.features?.[0]
    if (!feature) return
    const p = feature.properties as any
    const coords = (feature.geometry as any).coordinates as [number, number]

    const location = [p.city, p.district, p.street].filter(Boolean).join(', ') || '—'
    const placeRow = p.place ? `<div class="popup-row"><span>Place</span><strong>${p.place}</strong></div>` : ''
    const html = `
      <div class="accident-popup">
        <div class="popup-row"><span>Date</span><strong>${p.date ?? '—'}</strong></div>
        <div class="popup-row"><span>Type</span><strong>${p.accident_type ?? '—'}</strong></div>
        <div class="popup-row"><span>Dead</span><strong style="color:#CC0000">${p.dead}</strong></div>
        <div class="popup-row"><span>Injured</span><strong style="color:#FF8C00">${p.injured}</strong></div>
        <div class="popup-row"><span>Location</span><strong>${location}</strong></div>
        ${placeRow}
      </div>
    `

    if (popup) popup.remove()
    popup = new maplibregl.Popup({ closeButton: true, maxWidth: '260px' })
      .setLngLat(coords)
      .setHTML(html)
      .addTo(map!)
  })

  // Cursor changes
  map.on('mouseenter', 'clusters', () => { map!.getCanvas().style.cursor = 'pointer' })
  map.on('mouseleave', 'clusters', () => { map!.getCanvas().style.cursor = '' })
  map.on('mouseenter', 'pins', () => { map!.getCanvas().style.cursor = 'pointer' })
  map.on('mouseleave', 'pins', () => { map!.getCanvas().style.cursor = '' })
}

onMounted(() => {
  map = new maplibregl.Map({
    container: mapContainer.value!,
    style: {
      version: 8,
      sources: {
        'carto-tiles': {
          type: 'raster',
          tiles: [
            'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            'https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            'https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
          ],
          tileSize: 256,
          attribution: '© OpenStreetMap contributors © CARTO',
        },
      },
      layers: [{ id: 'carto', type: 'raster', source: 'carto-tiles' }],
    },
    center: [44.5, 40.2],
    zoom: 7,
  })

  map.addControl(new maplibregl.NavigationControl(), 'top-right')

  map.on('load', () => {
    initLayers()
    scheduleFetch()
  })

  map.on('moveend', scheduleFetch)
  map.on('zoomend', scheduleFetch)
})

onUnmounted(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
  popup?.remove()
  map?.remove()
})

// Re-fetch when filter panel triggers a refetch
watch(
  () => props.refetchTrigger,
  () => {
    const bbox = getBbox()
    if (bbox) store.load(bbox)
  },
)

// Update source when geojson changes
watch(
  () => store.geojson,
  (data) => {
    if (!map || !data) return
    const src = map.getSource('accidents-src') as maplibregl.GeoJSONSource | undefined
    src?.setData(data)
  },
)
</script>

<template>
  <div ref="mapContainer" class="map-container" />
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>

<style>
.accident-popup {
  font-size: 13px;
  line-height: 1.6;
}
.popup-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
.popup-row span {
  color: #666;
}
</style>
