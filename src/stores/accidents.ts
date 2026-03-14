import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchAccidents } from '@/services/api'
import type { AccidentParams } from '@/services/api'

export interface BBox {
  min_lat: number
  max_lat: number
  min_lon: number
  max_lon: number
}

export const useAccidentsStore = defineStore('accidents', () => {
  const geojson = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const filters = ref<{ date_from?: string; date_to?: string; accident_type?: string }>({})

  async function load(bbox: BBox) {
    loading.value = true
    error.value = null
    try {
      const params: AccidentParams = { ...bbox, ...filters.value }
      geojson.value = await fetchAccidents(params)
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  return { geojson, loading, error, filters, load }
})
