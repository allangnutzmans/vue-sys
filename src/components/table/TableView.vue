<script setup lang="ts">
import DefaultTable from './DefaultTable.vue';
import TableHead from "@/components/table/TableHead.vue";
import {onMounted, ref} from "vue";
import {supabase} from "@/service/supabase";

const header = [
  { title: 'ID', key: 'user_id' },
  { title: 'Points', key: 'points' },
  { title: 'Badges', key: 'badges' },
  { title: 'Last Activity', key: 'last_activity' },
  { title: 'Created', key: 'created_at' },
  { title: 'Updated', key: 'updated_at' },
];


const items = ref([])
const loading = ref(false);

async function getItems() {
  loading.value = true;
  const { data } = await supabase.from('gamification').select()
  items.value = data;
  loading.value = false;
}

onMounted(() => {
  getItems()
})

</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <TableHead />
        <DefaultTable :items="items" :header="header" :loading />
      </div>
    </div>
  </section>
</template>
