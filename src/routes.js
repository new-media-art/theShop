import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Signin from './components/auth/Signin'

import ProductItem from './components/product/ProductItem'
import ProductList from './components/product/ProductList'
import CartList from './components/cart/CartList'

import NotFound from './components/error/NotFound'

const routes = [
    {
        path: '/login',
        component: Signin,
        beforeEnter: (to, from, next) => {
            const token = localStorage.getItem('token');
            if (token) next('/')
            else next();
        }
    },
    {
        path: '/',
        component: ProductList
    },
    {
        path: '/cart',
        component: CartList
    },
    {
        path: '/products/:id',
        component: ProductItem,
        props: true
    },
    {
        path: '*',
        component: NotFound
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

// Globaler Route Guard
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (!token && to.path !== '/login') {
        next('/login');
    } else {
        next();
    }
});

export default router;