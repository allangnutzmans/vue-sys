import {computed, ComputedRef, onUnmounted, Ref, ref} from 'vue';

type DialogState = Record<string, boolean>;

const isDialogOpen: Ref<DialogState> = ref({});

interface UseDialogReturn {
    isOpen: ComputedRef<boolean>;
    openDialog: () => void;
    closeDialog: () => void;
}

type useDialogState = (id?: string) => UseDialogReturn;

export const useDialog: useDialogState = (id?: string): UseDialogReturn => {
    const isOpen: ComputedRef<boolean> = computed<boolean>(() => (id ? isDialogOpen.value[id] || false : isDialogOpen.value.default || false));

    const openDialog = (): void => {
        if (id) {
            isDialogOpen.value[id] = true;
        } else {
            isDialogOpen.value.default = true;
        }
    };

    const closeDialog = (): void => {
        if (id) {
            isDialogOpen.value[id] = false;
        } else {
            isDialogOpen.value.default = false;
        }
    };

    onUnmounted(() => {
        closeDialog();
    });


    return {
        isOpen,
        openDialog,
        closeDialog,
    };
};
