<script setup lang="ts">
import { useAccidentsStore } from '@/stores/accidents'
import { useI18n } from "vue-i18n"
import { useDebounceFn } from '@vueuse/core'
import { ACCIDENT_TYPE_MAP } from '@/services/utils'

const { t } = useI18n()
const store = useAccidentsStore()

const emit = defineEmits<{ refetch: [] }>()

function onFilterChange() {
	emit('refetch')
}
// debounce for search input
const debouncedFilterChange = useDebounceFn(() => {
	emit('refetch')
}, 500)
</script>

<template>
	<div class="filter-panel">
		<div class="filter-panel__container">
			<div class="filter-panel__body">
				<div class="filter-panel__group">
					<label for="from-date-input">{{ t('filterLabelFrom') }}</label>
					<input id="from-date-input" v-model="store.filters.date_from" type="date" @change="onFilterChange"
						class="input" />
				</div>
				<div class="filter-panel__group">
					<label for="to-date-input">{{ t('filterLabelTo') }}</label>
					<input id="to-date-input" v-model="store.filters.date_to" type="date" @change="onFilterChange"
						class="input" />
				</div>
				<div class="filter-panel__group">
					<label for="types-select">{{ t('filterLabelType') }}</label>
					<select id="types-select" class="select input" v-model="store.filters.accident_type"
						@change="onFilterChange">
						<option value="">{{ t('allTypes') }}</option>
						<option v-for="(armenianValue, key) in ACCIDENT_TYPE_MAP" :key="key" :value="armenianValue">
							{{ t(`accidentTypes.${key}`) }}
						</option>
					</select>
				</div>
				<!-- <div class="filter-panel__group">
					<label for="search-input">{{ t('filterLabelType') }}</label>
					<input id="search-input" v-model="store.filters.accident_type" type="text"
						:placeholder="t('filterPlaceholder')" @input="debouncedFilterChange" class="input" />
				</div> -->
				<div class="filter-panel__group">
					<label class="filter-panel__group-label--checkbox" for="only-dead">{{ t('filterLabelDeath') }}</label>
					<input id="only-dead" v-model="store.filters.only_dead" type="checkbox" @change="onFilterChange" />
				</div>
				<button :disabled="store.isFiltersEmpty" class="filter-panel__button" @click="store.resetFilters()">
					{{ t('clearFilters') }}
				</button>
				<div v-if="store.loading" class="filter-panel__indicator filter-panel__indicator--loading">{{
					t('filterIndicatorLoading') }}</div>
				<div v-if="store.error" class="filter-panel__indicator filter-panel__indicator--error">{{ store.error }}
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.filter-panel {
	padding: toRem(12) 0;
	background: $bgColor;
	border-bottom: 1px solid $greyColor;
	font-size: toRem(14);

	@media (max-width:$mobile) {
		font-size: toRem(12);
	}

	&__body {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: toRem(32);
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

		&-label--checkbox {
			cursor: pointer;
			transition: all 0.3s;

			@media (any-hover: hover) {
				&:hover {
					color: $accentColor;
				}
			}
		}

		.select {
			width: toRem(170);
		}

		.input {
			border: 1px solid $greyColor;
			border-radius: 4px;
			padding: 2px 8px;
			outline: none;
			line-height: 1.5;
			font-size: toRem(14);
			transition: all 0.3s;
			background-color: #fff;
			height: toRem(28);

			@media (max-width:$mobile) {
				font-size: toRem(12);
			}

			&:focus {
				border-color: $greyDarkColor;
			}

			@media (any-hover: hover) {
				&:hover {
					border-color: $greyDarkColor;
				}
			}
		}
	}

	&__button {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		gap: toRem(8);
		border: 1px solid $accentColor;
		color: $accentColor;
		background-color: #fff;
		border-radius: 8px;
		padding: toRem(2) toRem(16);
		min-height: toRem(28);
		line-height: 1.5;
		font-size: toRem(14);
		transition: all 0.3s;
		font-weight: 600;

		@media (max-width:$mobile) {
			font-size: toRem(12);
		}

		&[disabled] {
			cursor: not-allowed;
			opacity: 0.5;
		}

		@media (any-hover: hover) {
			&:not(:disabled):hover {
				background-color: $accentColor;
				color: #fff;
			}
		}
	}

	&__indicator {
		font-size: toRem(16);
		font-weight: 500;
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0px);
		bottom: 24px;
		border: 1px solid $greyColor;
		background-color: #fff;
		border-radius: 8px;
		padding: toRem(8) toRem(16);
		z-index: 100;

		&--loading {
			color: $greyDarkColor;
		}

		&--error {
			color: #FF4500;
		}
	}
}
</style>
