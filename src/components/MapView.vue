<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { ref } from 'vue'
import { useI18n } from "vue-i18n"
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import Supercluster from 'supercluster'
import { useAccidentsStore } from '@/stores/accidents'

const props = defineProps<{ refetchTrigger?: number }>()
const { t, locale } = useI18n()
const activeFeatureProps = ref<any>(null)
const mapContainer = ref<HTMLDivElement | null>(null)
const store = useAccidentsStore()
let map: maplibregl.Map | null = null
let popup: maplibregl.Popup | null = null
let sc: Supercluster | null = null

function buildCluster() {
	if (!store.rawGeojson || !map) return
	sc = new Supercluster({ radius: 60, maxZoom: 20 })
	sc.load(store.rawGeojson.features)
	updateSource()
}

function updateSource() {
	if (!sc || !map) return
	const bounds = map.getBounds()
	const zoom = Math.round(map.getZoom())
	const clusters = sc.getClusters(
		[bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()],
		zoom,
	)
	const src = map.getSource('accidents-src') as maplibregl.GeoJSONSource | undefined
	src?.setData({ type: 'FeatureCollection', features: clusters })
}

function getPopupHTML(p: any) {
	const location = [p.city, p.district, p.street].filter(Boolean).join(', ') || '—'
	const placeRow = p.place ? `<div class="popup-row"><span>${t('mapPopupPlace')}</span><strong>${p.place}</strong></div>` : ''

	return `
      <div class="accident-popup">
        <div class="popup-row"><span>${t('mapPopupDate')}</span><strong>${p.date ?? '—'}</strong></div>
        <div class="popup-row"><span>${t('mapPopupType')}</span><strong>${p.accident_type ?? '—'}</strong></div>
        <div class="popup-row"><span>${t('mapPopupDead')}</span><strong style="color:#CC0000">${p.dead}</strong></div>
        <div class="popup-row"><span>${t('mapPopupInjured')}</span><strong style="color:#FF8C00">${p.injured}</strong></div>
        <div class="popup-row"><span>${t('mapPopupLocation')}</span><strong>${location}</strong></div>
        ${placeRow}
      </div>
    `
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
		filter: ['has', 'point_count'],
		paint: {
			'circle-radius': [
				'interpolate', ['linear'], ['get', 'point_count'],
				1, 8, 50, 18, 500, 28, 5000, 40,
			],
			'circle-color': [
				'interpolate', ['linear'], ['get', 'point_count'],
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
		filter: ['has', 'point_count'],
		layout: {
			'text-field': ['get', 'point_count'],
			'text-font': ['Open Sans Bold'],
			'text-size': 12,
		},
		paint: { 'text-color': '#fff' },
	})

	// Individual pins
	map.addLayer({
		id: 'pins',
		type: 'circle',
		source: 'accidents-src',
		filter: ['!', ['has', 'point_count']],
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

	// Cluster click → zoom in (stop if already at max expansion)
	map.on('click', 'clusters', (e) => {
		const feature = e.features?.[0]
		if (!feature || !sc) return
		const coords = (feature.geometry as any).coordinates as [number, number]
		const expansionZoom = sc.getClusterExpansionZoom(feature.properties!.cluster_id)
		if (expansionZoom > map!.getZoom()) {
			map!.flyTo({ center: coords, zoom: expansionZoom })
		}
	})

	// Pin click → popup
	map.on('click', 'pins', (e) => {
		const feature = e.features?.[0]
		if (!feature) return

		const p = feature.properties as any
		activeFeatureProps.value = p
		const coords = (feature.geometry as any).coordinates as [number, number]

		if (popup) popup.remove()

		popup = new maplibregl.Popup({ closeButton: true, maxWidth: '260px' })
			.setLngLat(coords)
			.setHTML(getPopupHTML(p))
			.addTo(map!)

		popup.on('close', () => {
			activeFeatureProps.value = null
		})
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
		store.load()
	})

	map.on('moveend', updateSource)
	map.on('zoomend', updateSource)
})

onUnmounted(() => {
	popup?.remove()
	map?.remove()
})

// Change popup language
watch(locale, () => {
   if (popup && popup.isOpen() && activeFeatureProps.value) {
      popup.setHTML(getPopupHTML(activeFeatureProps.value))
   }
})
// Re-fetch when filters change
watch(
	() => props.refetchTrigger,
	() => store.load(),
)

// Rebuild supercluster index when raw data arrives
watch(
	() => store.rawGeojson,
	() => buildCluster(),
)
</script>

<template>
	<div ref="mapContainer" class="map-container" />
</template>

<style>
.maplibregl-popup-content {
	padding: 24px 12px;
}

.maplibregl-popup-close-button {
	font-size: 20px;
	width: 20px;
	height: 20px;
	line-height: 1;
}

.maplibregl-ctrl-attrib-inner {
	font-size: 8px !important;
}

.map-container {
	width: 100%;
	height: 100%;
}

.accident-popup {
	font-size: 12px;
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