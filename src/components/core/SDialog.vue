<script setup lang="ts">
import { useDialog } from '@/components/core/useDialog';
import SDefaultDialog from '@/components/core/SDefaultDialog.vue';
import SConfirmDialog from '@/components/core/SConfirmDialog.vue';
import { onClickOutside } from '@vueuse/core';

const props = withDefaults(defineProps<{
    variant?: 'default' | 'confirm';
    id?: string
    title: string
    onCancel?: () => void | Promise<void>
    onSave?: () => void | Promise<void>
}>(),{
    variant: 'default'
})

</script>

<template>
    <SDefaultDialog v-bind="props" v-if="variant === 'default'" />
    <SConfirmDialog v-bind="props" v-if="variant === 'confirm'" />
</template>

<style scoped>
.index {
    z-index: 9999;
}
</style>