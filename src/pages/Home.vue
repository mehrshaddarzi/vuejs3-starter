<template>
    <p class="lh-lg" v-html="lorem"></p>
</template>

<script setup>
import { ref } from "vue";
import { faker } from '@faker-js/faker/locale/fa';

const lorem = ref(faker.lorem.paragraph(8));
</script>

<style>
</style>