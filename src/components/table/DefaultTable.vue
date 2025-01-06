<script setup lang="ts" generic="T">
import { defineProps, ref, computed } from 'vue';
import SProgerssBar from '@/components/core/SProgerssBar.vue';
import TableFooter from '@/components/table/TableFooter.vue';

const props = withDefaults(
    defineProps<{
        header?: { title: string; key: string }[];
        items?: T[];
        loading?: boolean;
    }>(),
    {
        items: () => []
    }
);

const currentPage = ref(1);
const itemsPerPage = ref(10);
function updateItemsPerPage(value: number) {
    itemsPerPage.value = value;
}

const totalPages = computed(() => {
    return Math.ceil(props.items.length / itemsPerPage.value);
});

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = currentPage.value * itemsPerPage.value;
    return props.items.slice(start, end);
});

function goToPage(page: number) {
    if (page < 1) page = 1;
    if (page > totalPages.value) page = totalPages.value;
    currentPage.value = page;
}

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
}

function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}
</script>

<template>
    <SProgerssBar v-if="props.loading" />
    <div class="table-wrapper overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <!-- Cabeçalho da Tabela -->
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
            <tr>
                <th v-for="(col, index) in props.header" :key="index" scope="col" class="px-4 py-3">
                    {{ col.title }}
                </th>
            </tr>
            </thead>

            <!-- Corpo da Tabela -->
            <tbody class="table-body" v-if="paginatedItems.length > 0 && !props.loading">
            <tr v-for="(item, index) in paginatedItems" :key="index" class="border-b dark:border-gray-700">
                <td v-for="col in props.header" :key="col.key" class="px-4 py-3">
                    <slot :name="col.key" :item="item as T" />
                    <template v-if="!$slots[col.key]">{{ item[col.key] }}</template>
                </td>
            </tr>
            </tbody>

            <!-- Exibição de Tabela Vazia -->
            <tbody v-if="paginatedItems.length === 0 && !props.loading">
            <tr>
                <td colspan="100%" class="px-4 py-3 text-center">This table is empty.</td>
            </tr>
            </tbody>
        </table>
    </div>

    <TableFooter
        :current-page="currentPage"
        :totalItems="items.length"
        :total-pages="totalPages"
        :items-per-page="itemsPerPage"
        @next-page="nextPage"
        @prev-page="prevPage"
        @first-page="goToPage(1)"
        @last-page="goToPage(totalPages)"
        @update-items-per-page="updateItemsPerPage"
    />
</template>

<style scoped>
.table-wrapper {
    min-height: calc(100vh - 285px);
    max-height: calc(100vh - 285px);
    overflow-y: auto;
}

thead th {
    position: sticky;
    top: 0;
    z-index: 1;
}
</style>
