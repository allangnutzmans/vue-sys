<script setup lang="ts">
import { defineProps } from 'vue';
import type { NavItemType } from './types.ts';

// Define the props for NavItem, destructuring with type annotations
const props = defineProps<NavItemType>();
</script>

<template>
    <li>
        <a
            v-if="props.to"
            :href="props.to"
            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
            <component
                :is="props.icon"
                class="w-6 h-6 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
            />
            <span class="ml-3">{{ props.label }}</span>
            <template v-if="props.badge !== undefined">
                <span
                    class="inline-flex justify-center items-center w-5 h-5 text-xs font-semibold rounded-full text-primary-800 bg-primary-100 dark:bg-primary-200 dark:text-primary-800"
                >
                    {{ props.badge }}
                </span>
            </template>
        </a>
    </li>
</template>
