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
            <li class="list-group-item">Username : {{ user.username }}</li>
            <li class="list-group-item">Email : {{ user.email }}</li>
            <li class="list-group-item">Phone : {{ user.phone }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'UserSingle',
    props: {
        user: Object,
        showLink: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style>
</style>