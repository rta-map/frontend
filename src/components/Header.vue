<script setup lang="ts">
import { watch, computed } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from 'vue-router'
import { menuToggle, menuClose } from "@/services/utils.ts"

const route = useRoute()
const { t, locale } = useI18n()
const currentLang = computed(() => locale.value)

watch(locale, (newLocale) => {
	document.documentElement.setAttribute('lang', newLocale)
	localStorage.setItem('userLanguage', newLocale)
})
watch(route, () => {
	menuClose()
})
</script>

<template>
	<header class="header">
		<div class="header__container">
			<div class="header__menu menu">
				<RouterLink to="/" class="menu__logo">Logo</RouterLink>
				<button type="button" :title="t('menuToggleButtonAria')" :aria-label="t('menuToggleButtonAria')"
					@click="menuToggle" class="icon-menu">
					<span></span>
				</button>
				<nav class="menu__body">
					<ul class="menu__list">
						<li class="menu__item">
							<RouterLink class="menu__link" to="/"> {{ t('menuItemMap') }}</RouterLink>
						</li>
						<li class="menu__item">
							<RouterLink class="menu__link" to="/about"> {{ t('menuItemAbout') }} </RouterLink>
						</li>
					</ul>
					<div class="menu__languages">
						<input type="radio" id="lang-arm" class="menu__language-input" value="hy" v-model="locale" />
						<label for="lang-arm" :class="{ active: currentLang === 'hy' }"
							class="menu__language-label">հայ</label>
						<input type="radio" id="lang-eng" class="menu__language-input" value="en" v-model="locale" />
						<label for="lang-eng" :class="{ active: currentLang === 'en' }"
							class="menu__language-label">eng</label>
					</div>
				</nav>
			</div>
		</div>
	</header>
</template>

<style lang="scss" scoped>
.header {
	width: 100%;
	position: relative;
	background-color: #F5F5F5;

	&__container {}
}

.menu {
	display: flex;
	align-items: center;
	justify-content: space-between;
	min-height: toRem(60);

	&__logo {
		img {
			max-width: 100%;
			max-height: 100%;
		}

		font-size: toRem(24);
		margin-right: toRem(16);
	}

	&__body {
		display: flex;
		align-items: center;

		@media (max-width: $mobile) {
			position: fixed;
			z-index: 49;
			width: 100%;
			height: calc(100% - 60px);
			right: -100%;
			top: 60px;
			overflow-y: auto;
			overflow-x: hidden;
			padding: toRem(24) toRem(16);
			transition: right 0.3s;
			background-color: #f5f5f5;
			flex-direction: column;
			justify-content: center;

		}

		.menu-open & {
			right: 0;
		}
	}

	&__list {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-end;
		gap: toRem(24);
		row-gap: toRem(8);
		margin-right: toRem(32);

		@media (max-width:$mobile) {
			flex-direction: column;
			margin-bottom: toRem(32);
			margin-right: 0;
			row-gap: toRem(16);
			justify-content: flex-start;
			align-items: flex-start;
		}
	}

	&__item {
		display: flex;

		.router-link-exact-active {
			color: $accentColor;
		}
	}

	&__link {
		transition: all 0.3s;
		font-size: toRem(20);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: toRem(4);

		@media (any-hover: hover) {
			&:hover {
				color: $accentColor;
			}
		}
	}

	&__languages {
		display: flex;
		max-width: toRem(180);
	}

	&__language-input {
		appearance: none;
		pointer-events: none;
		opacity: 0;
		position: absolute;

		&:focus+.menu__language-label {
			color: $mainColor;
		}
	}

	&__language-label {
		cursor: pointer;
		padding: 0 toRem(8);
		font-size: toRem(20);
		color: #999999;
		transition: all 0.3s;

		&.active {
			color: $mainColor;
		}

		&:not(:last-child) {
			border-right: 1px solid #999999;
		}

		@media (any-hover: hover) {
			&:hover {
				color: $mainColor;
			}
		}
	}
}

.icon-menu {
	display: none;

	span,
	&::before,
	&::after {
		content: "";
		transition: all 0.3s ease 0s;
		right: 0;
		position: absolute;
		width: 100%;
		height: toRem(2);
		border-radius: 1px;
		background-color: $accentColor;
	}

	&::after {
		bottom: 0;
	}

	&::before {
		top: 0;
	}

	span {
		top: calc(50% - toRem(1));
	}

	.menu-open & {
		span {
			width: 0;
		}

		&::before {
			top: calc(50% - toRem(1));
			transform: rotate(-45deg);
		}

		&::after {
			bottom: calc(50% - toRem(1));
			transform: rotate(45deg);
		}
	}

	@media (max-width: $mobile) {
		display: block;
		position: relative;
		width: toRem(32);
		height: toRem(24);
		z-index: 50;
	}
}
</style>
