import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import UsersList from '../pages/UsersList.vue'
import SingleUser from '../pages/SingleUser.vue'
import PassThrough from '@/components/PassThrough.vue'
import PostsList from '../pages/PostsList.vue'
import FormClassic from '../pages/form/Classic.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/users',
    component: PassThrough,
    children: [
      {
        path: '',
        name: 'users',
        component: UsersList,
      },
      {
        // @see https://router.vuejs.org/guide/essentials/route-matching-syntax.html#custom-regex-in-params
        path: ':id(\\d+)',
        name: 'users.single',
        component: SingleUser
      }
    ]
  },
  {
    path: '/posts',
    component: PassThrough,
    children: [
      {
        path: '',
        name: 'posts',
        component: PostsList,
      }
    ]
  },
  {
    path: '/forms',
    component: PassThrough,
    children: [
      {
        path: '',
        name: 'forms.classic',
        component: FormClassic,
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/404.vue'),
  },
  {
    path: "/:catchAll(.*)",
    redirect: '/404',
  },
  /*{
    path: '/about',
    name: 'about',
    // this generates a separate chunk (about.[hash].js) for this route
    component: () => import('../views/AboutView.vue')
  }*/
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
