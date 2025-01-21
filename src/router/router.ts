import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';


const routes: RouteRecordRaw[] = [
    {
        path: '/games',
        component: import('../views/TableView.vue')
    },
    {
        path: '/users',
    }
];

const router = createRouter({
    history: createWebHistory('/'),
    routes,
})

export default router;