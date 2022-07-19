import {createRouter, createWebHistory, useRouter} from 'vue-router'
import Core from './components/Core/Core.vue'
import Login from './components/Login/Login.vue'
import Callback from './components/Login/Callback.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'core',
            path: '/',
            component: Core,
        },
        {
            name: 'login',
            path: '/login',
            component: Login,
        },
        {
            name: 'callback',
            path: '/callback',
            component: Callback,
        },
    ]
})
