<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue';
</script>

<template>
	<Header />
	<main class="page">
		<RouterView />
	</main>
</template>

<style lang="scss"></style>
