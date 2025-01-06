<script setup lang="ts">
import { ref } from 'vue';
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from '@tabler/icons-vue';

defineProps<{
    currentPage: number;
    totalPages: number;
    totalItems: number;
}>();

const emit = defineEmits<{
    (e: 'next-page'): void;
    (e: 'prev-page'): void;
    (e: 'first-page'): void;
    (e: 'last-page'): void;
    (e: 'update-items-per-page', itemsPerPage: number): void;
}>();

// Reactive reference for items per page
const itemsPerPage = ref(10);

// Handle items per page change
const updateItemsPerPage = (value: number) => {
    itemsPerPage.value = value;
    emit('update-items-per-page', value);
};
</script>

<template>
    <nav
        class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
        aria-label="Table navigation"
    >
        <div class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing
            <span class="font-semibold text-gray-900 dark:text-white"
                >{{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, 1000) }}</span
            >
            of
            <span class="font-semibold text-gray-900 dark:text-white">{{ totalItems }}</span>
        </div>

        <div>
            <!-- Pagination buttons -->
            <ul class="inline-flex items-stretch -space-x-px">
                <li>
                    <button
                        @click="$emit('first-page')"
                        :disabled="currentPage <= 1"
                        class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <span class="sr-only">First</span>
                        <IconChevronsLeft size="20" stroke="2.5" />
                    </button>
                </li>
                <li>
                    <button
                        @click="$emit('prev-page')"
                        :disabled="currentPage <= 1"
                        class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <span class="sr-only">Previous</span>
                        <IconChevronLeft size="20" stroke="2.5" />
                    </button>
                </li>
                <li>
                    <button
                        @click="$emit('next-page')"
                        :disabled="currentPage >= totalPages"
                        class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <span class="sr-only">Next</span>
                        <IconChevronRight size="20" stroke="2.5" />
                    </button>
                </li>
                <li>
                    <button
                        @click="$emit('last-page')"
                        :disabled="currentPage >= totalPages"
                        class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <span class="sr-only">Last</span>
                        <IconChevronsRight size="20" stroke="2.5" />
                    </button>
                </li>
            </ul>
            <!-- Items per page dropdown -->
            <div class="flex justify-between items-center py-4">
                <span class="text-sm text-gray-500 dark:text-gray-400">Items per page:</span>
                <select v-model="itemsPerPage" @change="updateItemsPerPage(Number(itemsPerPage))">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>

    </nav>
</template>

<style scoped>
/* Scoped styles if needed */
</style>
