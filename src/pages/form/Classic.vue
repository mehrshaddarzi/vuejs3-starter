<template>
    <div class="row">

        <div class="col-8">

            <!-- https://github.com/asika32764/vue2-animate -->
            <transition name="fade">
                <div v-if="sendCompleted" class="alert alert-success" role="alert">
                    A simple success alert—check it out!
                </div>
            </transition>

            <transition name="fade">
                <div v-if="formErrorMessage" class="alert alert-danger" role="alert">
                    {{ formErrorMessage }}
                </div>
            </transition>

            <form @submit.prevent="sendForm">

                <div class="mb-3">
                    <label class="form-label">Title</label>
                    <input type="text" class="form-control" v-model.lazy.trim="form.title" />
                    <div class="form-text text-danger">
                        {{ error.title }}
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label">Body</label>
                    <textarea class="form-control" v-model.lazy.trim="form.body"></textarea>
                    <div class="form-text text-danger">
                        {{ error.body }}
                    </div>
                </div>


                <div class="mb-3">
                    <label class="form-label">File</label>
                    <input type="file" @change="onFileUpload">
                    <div class="form-text text-danger">
                    </div>
                </div>

                <button type="submit" class="btn btn-dark" :disabled="loading">
                    <div v-if="loading" class="spinner-border spinner-border-sm" role="status"></div>
                    Create Post
                </button>
            </form>


        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { object, string, setLocale, number, date } from 'yup';
import { useHead } from "@vueuse/head"
import { User } from '@/model/User'
import { Helper } from '@/model/Helper'

// Load Router
const router = useRouter()
const route = useRoute()

// Page Head
const pageData = reactive({
    title: 'Form classic',
    description: `Form Classic Description`,
})

// Define Ref
const loading = ref(false)
const sendCompleted = ref(false)
const formErrorMessage = ref(null)

// Set Locale Yup
// https://github.com/pocka/yup-locale-ja/blob/master/src/descriptive.ts
setLocale({
    mixed: {
        required: ({ label, path }) => (label ? label + " " : path) + "الزامی می باشد",
    }
});

// Form Yup Schema
const FormYupSchema = object().shape({
    title: string().label('عنوان خبر').required().email(),
    body: string().required()
})

// InputForm
const inputForm = {
    title: '',
    body: '',
    image: null
};

// Custom Input Example: 
const form = reactive({ ...inputForm })
function resetForm() {
    for (const [key, value] of Object.entries(inputForm)) {
        form[key] = value
    }
}
const error = reactive({})

// Set Image Input
function onFileUpload(event) {
    inputForm.image = event.target.files[0]
}

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

// Send Form
async function sendForm(event) {

    loading.value = true;

    // @see https://vijitail.dev/blog/form-validation-in-vue-using-yup
    // @see https://github.com/jquense/yup#schemavalidatevalue-any-options-object-promiseinfertypeschema-validationerror
    try {

        await FormYupSchema.validate(form, { abortEarly: true })

        await axios
            .post("https://jsonplaceholder.typicode.com/posts", {
                title: form.title,
                body: form.bady,
                userId: 1,
            })
            .then(function () {

                // Hide Loading
                loading.value = false;

                // Reset Form
                resetForm() // Use For v-Model Except Input File
                event.target.reset(); // Use For Input File

                // Show Send Completed Alert
                sendCompleted.value = true
                setTimeout(() => {
                    sendCompleted.value = false
                }, 5000);
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (errorMessage) {
        console.log(errorMessage)
        formErrorMessage.value = errorMessage.toString().replace("ValidationError: ", "")

        setTimeout(() => {
            formErrorMessage.value = null
        }, 5000);

        loading.value = false;
    }

}

// Send File Form
function sendFileForm() {
    let formData = new FormData()
    formData.append('file', inputForm.image)
    formData.append('_method', 'PUT')
    axios.post('/single-file',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    ).then(function () {
        console.log('SUCCESS!!');
    })
        .catch(function () {
            console.log('FAILURE!!');
        });
}


</script>

<style scoped>
</style>