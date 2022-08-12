import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import UsersList from '../pages/UsersList.vue'
import SingleUser from '../pages/SingleUser.vue'
import PassThrough from '@/components/PassThrough.vue'
import PostsList from '../pages/PostsList.vue'

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
        path: ':id',
        name: 'users.single',
        component: SingleUser,
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
