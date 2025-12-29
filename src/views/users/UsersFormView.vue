<script setup lang="ts">
import { Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { User, useUserStore } from '@/store/user-store';

const store = useUserStore();
const { item } = storeToRefs(store);
const user: Ref<User> = item;

const options = ["Master","Beginner","Veteran","Achiever","Explorer"];
</script>

<template>
    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <!-- Product Name -->
        <div class="sm:col-span-2">
            <label for="game_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Product Name
            </label>
            <input
                v-model="user.game_name"
                type="text"
                id="game_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type user name"
            />
        </div>

        <!-- Points -->
        <div class="w-full">
            <label for="points" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Points
            </label>
            <input
                v-model="user.points"
                type="number"
                id="points"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="2999"
            />
        </div>

        <!-- Level -->
        <div class="w-full">
            <label for="points" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Level
            </label>
            <input
                v-model="user.level"
                type="number"
                id="points"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="2999"
            />
        </div>

        <!-- Badges -->
        <div>
            <label for="badges" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Badge
            </label>
            <select
                v-model="user.badges"
                id="badges"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
                <option selected disabled>Select badge</option>
                <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
            </select>
        </div>
    </div>
</template>

<style scoped></style>