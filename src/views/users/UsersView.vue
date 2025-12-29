<script setup lang="ts">
import TableHead from '@/components/table/TableHead.vue';
import { nextTick, onMounted } from 'vue';
import SMenu from '@/components/core/dropdown/SMenu.vue';
import SButton from '@/components/core/SButton.vue';
import { IconPlus } from '@tabler/icons-vue';
import { storeToRefs } from 'pinia';
import SListItem from '@/components/core/dropdown/SListItem.vue';
import { useDialog } from '@/components/core/useDialog';
import SDialog from '@/components/core/SDialog.vue';

import SBadge from '@/components/core/SBadge.vue';
import GamesFormView from '@/views/games/GamesFormView.vue';
import DefaultTable from '@/components/table/DefaultTable.vue';
import { useUserStore } from '@/store/user-store';

const header = [
    { title: 'User', key: 'username' },
    { title: 'email', key: 'email' },
    { title: 'Created', key: 'created_at' },
    { title: 'Updated', key: 'updated_at' },
    { title: 'Actions', key: 'actions' }
];

const { openDialog } = useDialog('form')
const listStore = useUserStore();
const { item: product, list, loading } = storeToRefs(listStore);


onMounted(async () => {
    await listStore.getList();
});

async function removeItem(id: number){
    await listStore.deleteItem(id)
}

async function editItem(_item){
    listStore.setItem(_item);
    await nextTick(() => {
        openDialog();
    })

}

function saveUsers() {
    if (product.value.user_id) {
        listStore.updateItem(product.value.user_id, product.value); // Update existing product
    } else {
        listStore.createItem(product.value); // Create new product
    }
}

function cancel() {
    listStore.setItem({});
}

</script>

<template>
    <SDialog
        title="Users"
        :onSave="saveUsers"
        :onCancel="cancel"
        id="form"
    >
        <GamesFormView />
    </SDialog>
    <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
            <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg section overflow-auto">
                <TableHead>
                    <template #create>
                        <s-button @click="openDialog" text="Add Users">
                            <IconPlus size="20" class="me-2" />
                        </s-button>
                    </template>
                </TableHead>
                <DefaultTable :items="list" :header="header" :loading>
                    <template #badges="{ item }: { item }">
                        <SBadge :badge="item.badges" />
                    </template>
                    <template #actions="{ item }: { item }">
                        <SMenu title="Ações">
                            <SListItem @click="editItem(item)">Edit</SListItem>
                            <SListItem @click="removeItem(item.id)">Delete</SListItem>
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
