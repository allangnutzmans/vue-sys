<script setup lang="ts">
import { useDialog } from '@/components/core/useDialog';

const props = defineProps<{
    id?: string
    title: string
    onCancel?: () => void | Promise<void>
    onSave?: () => void | Promise<void>
}>()
const { isOpen, closeDialog } = useDialog(props.id);

async function cancel(){
    if (props.onCancel) await props.onCancel();
    closeDialog();
}

async function save(){
    if (props.onSave) await props.onSave();
    closeDialog();
}

</script>

<template>
    <teleport to="body">
        <div
            v-show="isOpen"
            @click.self="cancel"
            class="index fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <div class="bg-white rounded-lg shadow-lg w-full mx-[200px]">
                <div class="p-4 border-b flex justify-between items-center">
                    <h3 class="text-lg font-semibold"> {{ title }}</h3>
                    <button @click="cancel" class="text-gray-500 hover:text-gray-700">
                        ✖
                    </button>
                </div>
                <div class="p-4">
                    <slot />
                </div>
                <div class="p-4 border-t flex justify-end space-x-2">
                    <button @click="cancel" class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded">
                        Cancel
                    </button>
                    <button @click="save" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<style scoped>
.index {
    z-index: 9999;
}
</style>