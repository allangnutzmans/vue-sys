<script setup lang="ts">

defineProps<{
  text: string
}>()
</script>

<template>
  <button class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
    <slot />
    {{ text }}
  </button>
</template>

<style scoped>

</style>