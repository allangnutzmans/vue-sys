<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { IconChevronDown } from '@tabler/icons-vue';

// Props do componente
defineProps<{ title: string }>();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
    isOpen.value = false;
};

onClickOutside(dropdownRef, closeDropdown);

</script>

<template>
    <div class="relative inline-block text-left" ref="dropdownRef">
        <!-- Botão para abrir/fechar o dropdown -->
        <button
            @click="toggleDropdown"
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :aria-expanded="isOpen"
            aria-haspopup="true"
        >
            {{ title }}
            <IconChevronDown />
        </button>

        <!-- Dropdown menu -->
        <div
            v-if="isOpen"
            class="absolute origin-top-right right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
        >
            <div @click="closeDropdown" class="py-1" role="menu" aria-orientation="vertical">
                <slot />
            </div>
        </div>
    </div>
</template>
