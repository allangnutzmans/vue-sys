<script setup lang="ts">
import { IconSearch } from '@tabler/icons-vue';
</script>

<template>
    <div class="flex items-center">
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <IconSearch size="20" />
            </div>
            <input
                type="text"
                id="simple-search"
                class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search"
                required
            />
        </div>
    </div>
</template>

<style scoped></style>
