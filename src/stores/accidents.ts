import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchAccidents } from '@/services/api'

export const useAccidentsStore = defineStore('accidents', () => {
	const rawGeojson = ref<any>(null)
	const loading = ref(false)
	const error = ref<string | null>(null)
	const filters = ref<{ date_from?: string; date_to?: string; accident_type?: string; only_dead?: boolean }>({
		accident_type: ""
	})

	const isFiltersEmpty = computed(() => {
		return !filters.value.accident_type &&
			!filters.value.date_from &&
			!filters.value.date_to &&
			!filters.value.only_dead
	})
	async function resetFilters() {
		filters.value = { accident_type: "" }
		await load()
	}
	async function load() {
		loading.value = true
		error.value = null
		try {
			rawGeojson.value = await fetchAccidents(filters.value)
		} catch (e: any) {
			error.value = e.message
		} finally {
			loading.value = false
		}
	}

	return { rawGeojson, loading, error, filters, isFiltersEmpty, resetFilters, load }
})
