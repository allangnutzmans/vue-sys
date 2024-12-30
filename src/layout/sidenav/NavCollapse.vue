<script setup lang="ts">
import { defineProps } from 'vue';
import type { Icon as IconType } from '@tabler/icons-vue';
import NavItem from './NavItem.vue';
import type { NavItemType } from './types.ts';

// Define the props for NavCollapse with proper types
const props = defineProps<{
  label: string;
  icon: IconType;
  children: NavItemType[];
}>();
</script>

<template>
  <li>
    <button
        type="button"
        class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        :aria-controls="`dropdown-${props.label.toLowerCase()}`"
        data-collapse-toggle="dropdown"
    >
      <component :is="props.icon" class="w-6 h-6 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
      <span class="flex-1 ml-3 text-left whitespace-nowrap">{{ props.label }}</span>
    </button>
    <ul :id="`dropdown-${props.label.toLowerCase()}`" class="hidden py-2 space-y-2">
      <li v-for="child in props.children" :key="child.label">
        <NavItem :label="child.label" :to="child.to" :icon="child.icon" :badge="child.badge" />
      </li>
    </ul>
  </li>
</template>
