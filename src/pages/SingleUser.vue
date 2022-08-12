<template>
    <div class="row">

        <div class="col-12">

            <content-loader v-if="loading" class="content-loader" :speed="2" primaryColor="#f3f3f3"
                secondaryColor="#ecebeb">
                <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
                <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
                <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
            </content-loader>

            <div v-if="!loading && error && error.length" class="alert alert-danger" role="alert">
                {{ error }}
            </div>

            <div class="text-right" v-if="!loading && data && data.id">
                <div class="col-md-6 mb-3">
                    <UserSingle :user="data" :show-link="false" />
                </div>
            </div>


            <button type="button" class="btn btn-dark" @click="router.go(-1)">{{ $t('pagination.back') }}</button>

        </div>

    </div>
</template>

<script>
import { ref, onMounted, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useHead } from "@vueuse/head"
import { User } from '../model/User'
import { ContentLoader } from 'vue-content-loader'
import UserSingle from '@/components/Users/Single'
import { Helper } from '../model/Helper'

export default {
    components: {
        ContentLoader,
        UserSingle
    },
    setup() {

        // Load Router
        const router = useRouter()
        const route = useRoute()

        // Page Head
        const pageData = reactive({
            title: '',
            description: `My beautiful website`,
        })

        // Define Ref
        const loading = ref(true)
        const data = ref(null)
        const error = ref(null)

        // Setup Page Header
        useHead({
            title: computed(() => pageData.title),
            meta: [
                {
                    name: `description`,
                    content: computed(() => pageData.description),
                }
            ],
        })

        // on Mounted
        onMounted(() => {
            User.get(route.params.id).then((result) => {
                if (result.success) {

                    // Set data Value
                    data.value = result.data

                    // Setup Page title
                    pageData.title = Helper.getPageTitle(result.data.name)
                } else {
                    error.value = result.message
                }

                loading.value = false
            });
        })

        // Return
        return { pageData, data, loading, error, route, router }
    }
};
</script>

<style>
</style>