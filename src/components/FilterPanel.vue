<script setup lang="ts">
import { useAccidentsStore } from '@/stores/accidents'
import { useI18n } from "vue-i18n"

const { t } = useI18n()
const store = useAccidentsStore()

const emit = defineEmits<{ refetch: [] }>()

function onFilterChange() {
	emit('refetch')
}
</script>

<template>
	<div class="filter-panel">
		<div class="filter-panel__container">
			<div class="filter-panel__body">
				<div class="filter-panel__group">
					<label>{{ t('filterLabelFrom') }}</label>
					<input v-model="store.filters.date_from" type="date" @change="onFilterChange" />
				</div>
				<div class="filter-panel__group">
					<label>{{ t('filterLabelTo') }}</label>
					<input v-model="store.filters.date_to" type="date" @change="onFilterChange" />
				</div>
				<div class="filter-panel__group">
					<label>{{ t('filterLabelType') }}</label>
					<input v-model="store.filters.accident_type" type="text" :placeholder="t('filterPlaceholder')"
						@input="onFilterChange" />
				</div>
				<div class="filter-panel__group">
					<label for="only-dead">{{ t('filterLabelDeath') }}</label>
					<input id="only-dead" v-model="store.filters.only_dead" type="checkbox" @change="onFilterChange" />
				</div>
				<div v-if="store.loading" class="filter-panel__loading-indicator">{{ t('filterIndicatorLoading') }}</div>
				<div v-if="store.error" class="filter-panel__error-indicator">{{ store.error }}</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.filter-panel {
	padding: toRem(12) 0;
	background: rgba(255, 255, 255, 0.95);
	border-bottom: 1px solid #ddd;
	font-size: toRem(14);

	@media (max-width:$mobile) {
		font-size: toRem(12);
	}

	&__body {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: toRem(16);
		row-gap: toRem(8);
	}

	&__group {
		display: flex;
		align-items: center;
		gap: toRem(8);

		& label {
			font-weight: 500;
			white-space: nowrap;
		}

		& input {
			border: 1px solid #ccc;
			border-radius: 4px;
			padding: 4px 8px;
			outline: none;
			font-size: toRem(14);
			transition: all 0.3s;

			@media (max-width:$mobile) {
				font-size: toRem(12);
			}

			&:focus {
				border-color: #4a90d9;
			}
		}
	}

	&__loading-indicator {
		color: #999999;
		font-style: italic;
	}

	&__error-indicator {
		color: #c00;
	}
}
</style>
