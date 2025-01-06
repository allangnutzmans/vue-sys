<script setup lang="ts">
import {
    IconMenuDeep,
    IconDashboard,
    IconFileText,
    IconShoppingCart,
    IconMessageCircle,
    IconLock,
    IconChevronDown
} from '@tabler/icons-vue';

import NavItem from './NavItem.vue';
import NavCollapse from './NavCollapse.vue';
import type { NavItemType } from '@/layout/sidenav/types.ts';

const sidebarItems: NavItemType[] = [
    { label: 'Overview', to: '/', icon: IconDashboard },
    {
        label: 'Pages',
        icon: IconFileText,
        children: [
            { label: 'Settings', to: '#' },
            { label: 'Kanban', to: '#' },
            { label: 'Calendar', to: '#' }
        ]
    },
    {
        label: 'Sales',
        icon: IconShoppingCart,
        children: [
            { label: 'Products', to: '#' },
            { label: 'Billing', to: '#' },
            { label: 'Invoice', to: '#' }
        ]
    },
    { label: 'Messages', to: '#', icon: IconMessageCircle, badge: 6 },
    { label: 'Authentication', icon: IconLock, to: '' }
];
</script>

<template>
    <aside class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidenav">
        <div class="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <ul class="space-y-2">
                <NavItem
                    v-for="item in sidebarItems"
                    v-if="!item.children"
                    :key="item.label"
                    :label="item.label"
                    :to="item.to"
                    :icon="item.icon"
                    :badge="item.badge"
                />
                <NavCollapse
                    v-for="item in sidebarItems"
                    v-if="item.children"
                    :key="item.label"
                    :label="item.label"
                    :icon="item.icon"
                    :children="item.children"
                />
            </ul>
        </div>
    </aside>
</template>

<style scoped>
aside {
    max-width: 25vh;
}
</style>
