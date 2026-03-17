<script setup lang="ts">
import { useI18n } from "vue-i18n"
const { t } = useI18n()
</script>

<template>
	<section class="about-main">
		<div class="about-main__container">
			<h1 class="about-main__title">{{ t('aboutMainTitle') }}</h1>
			<div class="about-main__text">{{ t('aboutMainText') }}</div>
		</div>
	</section>
	<section class="about-section">
		<div class="about-section__container">
			<h2 class="about-section__title">{{ t('aboutSectionTitle1') }}</h2>
			<div class="about-section__text">{{ t('aboutSectionText1') }}</div>
		</div>
	</section>
	<section class="about-section">
		<div class="about-section__container">
			<h2 class="about-section__title">{{ t('aboutContactsTitle') }}</h2>
			<div class="about-section__text">{{ t('aboutContactsText') }}</div>
			<div class="about-section__contacts">
				<a href="" class="about-section__contacts-item">
					<img src="@/assets/icons/instagram.svg" alt="">
					Instagram name</a>
				<a href="" class="about-section__contacts-item">
					<img src="@/assets/icons/telegram.svg" alt="">
					Telegram name</a>
				<a href="" class="about-section__contacts-item">Other</a>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.about-main {
	padding: toRem(48) 0;

	&__container {
		max-width: toRem(800);
	}

	&__title {
		font-size: toRem(40);
		line-height: 1.6;
		margin-bottom: toRem(8);
		font-weight: 500;

		@media (max-width:$mobile) {
			font-size: toRem(32);
		}

		@media (max-width:$mobileSmall) {
			font-size: toRem(24);
		}
	}

	&__text {
		font-size: toRem(20);
		line-height: 1.6;

		@media (max-width:$mobileSmall) {
			font-size: toRem(18);
		}
	}
}

.about-section {
	padding-bottom: toRem(40);

	&__container {
		max-width: toRem(800);
	}

	&__title {
		font-size: toRem(30);
		line-height: 1.33;
		margin-bottom: toRem(8);
		font-weight: 500;

		@media (max-width:$mobile) {
			font-size: toRem(24);
		}

		@media (max-width:$mobileSmall) {
			font-size: toRem(20);
		}
	}

	&__text {
		font-size: toRem(16);
		line-height: 1.5;
	}

	&__contacts {
		margin-top: toRem(16);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: toRem(12);
	}

	&__contacts-item {
		display: inline-flex;
		align-items: center;
		color: #004D99;
		transition: all 0.3s;

		@media (any-hover: hover) {
			&:hover {
				color: #000040
			}
		}

		&:visited {
			color: #800080
		}

		img {
			width: toRem(24);
			height: toRem(24);
			margin-right: toRem(8);
		}
	}
}
</style>
