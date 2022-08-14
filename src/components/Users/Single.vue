<template>
    <div class="card">
        <div class="card-header">

            <router-link v-if="showLink" :to="{ name: 'users.single', params: { id: user.id } }">
                {{ user.name }}
            </router-link>
            <span v-else>
                {{ user.name }}
            </span>

        </div>

        <ul class="list-group list-group-flush">
            <li class="list-group-item" @click="someEvent(2)">Username : {{ user.username }}</li>
            <li class="list-group-item">Email : {{ user.email }}</li>
            <li class="list-group-item">Phone : {{ user.phone }}</li>
        </ul>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    user: Object,
    showLink: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['myEmitName'])

function someEvent(item) {
    emit('myEmitName', {name: 'Ali', 'family': 'Darzi', 'item': item})
}
</script>

<style>
</style>