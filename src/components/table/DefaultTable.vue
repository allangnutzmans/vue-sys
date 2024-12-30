<script setup lang="ts">
import { defineProps } from 'vue';
import SProgerssBar from "@/components/core/SProgerssBar.vue";

const props = withDefaults(defineProps<{
  header?: { title: string; key: string }[];
  items?: any[];
  loading?: boolean;
}>(),{
  items: () => [],
});
</script>

<template>
  <SProgerssBar v-if="loading" />
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <!-- Cabeçalho da Tabela -->
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

    <tr>
      <th
          v-for="(col, index) in props.header"
          :key="index"
          scope="col"
          class="px-4 py-3"
      >
        {{ col.title }}
      </th>
      <th scope="col" class="px-4 py-3">
        <!-- Ações -->
      </th>
    </tr>
    </thead>

    <!-- Corpo da Tabela -->
    <tbody v-if="props.items.length > 0 && !props.loading">
    <tr v-for="(item, index) in props.items" :key="index" class="border-b dark:border-gray-700">
      <td v-for="col in props.header" :key="col.key" class="px-4 py-3">
        {{ item[col.key] }}
      </td>
      <td class="px-4 py-3 flex items-center justify-end">
        <!-- Botão de Ações -->
        <button id="dropdown-button" data-dropdown-toggle="dropdown" class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
          <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
        <div id="dropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
          <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
            <li><a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a></li>
            <li><a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a></li>
          </ul>
          <div class="py-1">
            <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
          </div>
        </div>
      </td>
    </tr>
    </tbody>

    <!-- Exibição de Tabela Vazia -->
    <tbody  v-if="props.items.length === 0 && !props.loading">
    <tr>
      <td colspan="100%" class="px-4 py-3 text-center">This table is empty.</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
/* Estilos específicos para a tabela */
</style>
