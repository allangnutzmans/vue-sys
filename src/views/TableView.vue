<script setup lang="ts">
import DefaultTable from '../components/table/DefaultTable.vue';
import TableHead from '@/components/table/TableHead.vue';
import { nextTick, onMounted } from 'vue';
import SMenu from '@/components/core/dropdown/SMenu.vue';
import SButton from '@/components/core/SButton.vue';
import { IconPlus } from '@tabler/icons-vue';
import { Product, useListStore } from '@/store/listStore';
import { storeToRefs } from 'pinia';
import SListItem from '@/components/core/dropdown/SListItem.vue';
import { useDialog } from '@/components/core/useDialog';
import SDialog from '@/components/core/SDialog.vue';
import FormView from '@/views/FormView.vue';
import SBadge from '@/components/core/SBadge.vue';

const header = [
    { title: 'Game', key: 'game_name' },
    { title: 'Points', key: 'points' },
    { title: 'Badges', key: 'badges' },
    { title: 'Last Activity', key: 'last_activity' },
    { title: 'Created', key: 'created_at' },
    { title: 'Updated', key: 'updated_at' },
    { title: 'Actions', key: 'actions' }
];

const { openDialog } = useDialog('form')
const listStore = useListStore();
const { item: product, list, loading } = storeToRefs(listStore);


onMounted(async () => {
    await listStore.getList();
});

async function removeItem(id: number){
    await listStore.deleteItem(id)
}

async function editItem(_item: Product){
    listStore.setItem(_item);
    await nextTick(() => {
        openDialog();
    })

}

function saveProduct() {
    if (product.value.user_id) {
        listStore.updateItem(product.value.user_id, product.value); // Update existing product
    } else {
        listStore.createItem(product.value); // Create new product
    }
}

function cancel() {
    listStore.setItem({} as Product);
}

</script>

<template>
    <SDialog
        title="Product"
        :onSave="saveProduct"
        :onCancel="cancel"
        id="form"
    >
        <FormView />
    </SDialog>
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
                    <template #badges="{ item }: { item: Product }">
                        <SBadge :badge="item.badges" />
                    </template>
                    <template #actions="{ item }: { item: Product }">
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
