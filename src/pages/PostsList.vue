<template>
    <div class="row">

        <div class="col-12">

            <div class="text-right" v-if="data && data.length">
                <div class="row" v-for="product in data" :key="product.id">
                    <div class="col-6 mb-3">
                        <div class="card mx-auto">
                            <img class="card-img-top" :src="product.thumbnail" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title" v-html="product.title"></h5>
                                <p class="card-text" v-html="product.description"></p>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"> {{ product.category }}</li>
                                <li class="list-group-item">{{ product.brand }}</li>
                                <li class="list-group-item">{{ product.stock }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="error && error.length" class="alert alert-danger" role="alert">
                {{ error }}
            </div>

            <infinite-loading @infinite="infiniteHandler" @distance="50">
                <template #spinner>
                    <content-loader v-if="!error" class="content-loader" :speed="2" primaryColor="#f3f3f3"
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
                </template>
                <template #no-more>
                    <div class="mb-5 mt-5"></div>
                </template>
                <template #no-results></template>
            </infinite-loading>

        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Helper } from '../model/Helper'
import { ContentLoader } from 'vue-content-loader'
//@see https://github.com/PeachScript/vue-infinite-loading
import InfiniteLoading from "vue-infinite-loading"

// Load Router
const router = useRouter()
const route = useRoute()

// Define Ref
const data = ref([])
const error = ref(null)

// page Count
const totalItems = ref(0)
const pageCount = ref(0)
const PerPage = ref(Helper.getPageSize(route, 5))
const paged = ref(Helper.getPageNumber(route))

// infiniteHandler Package Method
function infiniteHandler($state) {
    axios
        .get('https://dummyjson.com/products', { params: { limit: PerPage.value, skip: (PerPage.value * paged.value) } })
        .then((response) => {
            let postsList = response.data.products;
            if (postsList.length && paged.value < 5) {
                data.value = [...data.value, ...postsList]
                $state.loaded();
            } else {
                $state.complete();
            }

            paged.value++;
        })
        .catch((e) => {
            error.value = "Problem Loaded"
        });
}
</script>

<style>
</style>