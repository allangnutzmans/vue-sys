import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';


const routes: RouteRecordRaw[] = [
    {
        path: '/games',
        component: () => import('../views/games/GamesView.vue')
    },
    {
        path: '/users',
        component: () => import('../views/users/UsersView.vue')
    },
];

const router = createRouter({
    history: createWebHistory('/'),
    routes,
})

export default router;