<template>
    <p class="lh-lg" v-html="lorem"></p>
</template>

<script>
import { ref } from "vue";
import { faker } from '@faker-js/faker/locale/fa';

export default {
    setup() {
        let lorem = ref(faker.lorem.paragraph(8));


        return { lorem };
    },
};
</script>

<style>
</style>