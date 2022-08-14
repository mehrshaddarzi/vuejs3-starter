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
                <circle cx="20" cy="20" r="20" />
                <rect x="-8" y="108" rx="0" ry="0" width="548" height="52" />
                <rect x="323" y="132" rx="0" ry="0" width="43" height="20" />
                <rect x="31" y="135" rx="0" ry="0" width="31" height="18" />
            </content-loader>

            <div v-if="!loading && error && error.length" class="alert alert-danger" role="alert">
                {{ error }}
            </div>

            <div class="text-right" v-if="!loading && data && data.length">
                <div class="row g-3" v-for="(chunk, index) in data" :key="index">
                    <div class="col-md-6 mb-3" v-for="user in chunk" :key="user.id">
                        <UserSingle :user="user" />
                    </div>
                </div>
            </div>

            <nav class="mt-4 mb-5" :class="{ 'opacity-25': loading }" v-if="showPagination">
                <Paginate v-model="paged" :page-count="pageCount" :page-range="PerPage" :force-page="paged"
                    :margin-pages="2" :click-handler="clickPaginate" :prev-text="$t('pagination.prev')"
                    :next-text="$t('pagination.next')" :container-class="'pagination'" :page-class="'page-item'"
                    :page-link-class="'page-link'" :prev-class="'page-item'" :prev-link-class="'page-link'"
                    :next-class="'page-item'" :next-link-class="'page-link'" :break-view-class="'break-view'"
                    :break-view-link-class="'break-view-link'" :first-last-button="false">
                </Paginate>
            </nav>

        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { User } from '../model/User'
import { Helper } from '../model/Helper'
import { ContentLoader } from 'vue-content-loader'
import UserSingle from '@/components/Users/Single'
import Paginate from '@/components/Paginate'

// Load Router
const router = useRouter()
const route = useRoute()

// Define Ref
const loading = ref(true)
const data = ref(null)
const error = ref(null)

// page Count
const totalItems = ref(0)
const pageCount = ref(0)
const PerPage = ref(Helper.getPageSize(route, 4))
const paged = ref(Helper.getPageNumber(route))
const showPagination = ref(false)

// on Mounted
onMounted(() => {
    showUsers(paged.value, PerPage.value)
})

// Methods
function showUsers(pageNumber, Limit) {
    let params = {}
    params[process.env.VUE_APP_PAGINATION_QUERY] = pageNumber
    params[process.env.VUE_APP_PAGINATION_LIMIT_QUERY] = Limit
    User.all(params).then((result) => {
        if (result.success) {
            data.value = _.chunk(result.data, 2)
            totalItems.value = 10
            pageCount.value = Math.ceil(totalItems.value / PerPage.value)
            if (pageCount.value > 0) {
                showPagination.value = true
            }
        } else {
            error.value = result.message
        }

        loading.value = false
    });
}

function clickPaginate(pageNum) {
    loading.value = true
    //@see https://github.com/vuejs/vue-router/issues/1631
    router.push({ name: 'users', query: { ...route.query, page: pageNum } })
}

// Change Query
watch(
    () => route.query.page,
    newValue => {
        showUsers(newValue, PerPage.value)
    }
)
</script>

<style>
</style>