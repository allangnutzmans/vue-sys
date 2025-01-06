<script setup lang="ts">
import DefaultTable from './DefaultTable.vue';
import TableHead from '@/components/table/TableHead.vue';
import { onMounted } from 'vue';
import SMenu from '@/components/core/dropdown/SMenu.vue';
import SButton from '@/components/core/SButton.vue';
import { IconPlus } from '@tabler/icons-vue';
import { useListStore } from '@/store/listStore';
import { storeToRefs } from 'pinia';
import SListItem from '@/components/core/dropdown/SListItem.vue';
import SDialog from '@/components/core/SDialog.vue';
import { useDialog } from '@/components/core/useDialog';

const header = [
    { title: 'ID', key: 'user_id' },
    { title: 'Points', key: 'points' },
    { title: 'Badges', key: 'badges' },
    { title: 'Last Activity', key: 'last_activity' },
    { title: 'Created', key: 'created_at' },
    { title: 'Updated', key: 'updated_at' },
    { title: 'Actions', key: 'actions' }
];

const { openDialog } = useDialog()
const listStore = useListStore();
const { list, loading } = storeToRefs(listStore);

onMounted(async () => {
    await listStore.getList();
});

async function removeItem(id: number){
    await listStore.deleteItem(id)
}

async function editItem(_item: Gamification){
    openDialog();
    ///await listStore.deleteItem(id)
}

</script>

<template>
    <SDialog title="Edit" />
    <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
            <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg section overflow-auto">
                <TableHead>
                    <template #create>
                        <s-button @click="openDialog" text="Add Product">
                            <IconPlus size="20" class="me-2" />
                        </s-button>
                    </template>
                </TableHead>
                <DefaultTable :items="list" :header="header" :loading>
                    <template #badges="{ item }"> </template>
                    <template #actions="{ item }: { item: Gamification }">
                        <SMenu title="Ações">
                            <SListItem @click="editItem(item)">Edit</SListItem>
                            <SListItem @click="removeItem(item.user_id)">Delete</SListItem>
                        </SMenu>
                    </template>
                </DefaultTable>
            </div>
        </div>
    </section>
</template>

<style scoped>
section {
    height: calc(100vh - 800px);
}
</style>
