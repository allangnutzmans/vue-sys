// stores/Gamification.ts
import { defineStore } from 'pinia';
import supabase from '@/service/supabase';
import { Ref, ref } from 'vue';

export type User = {
    id? : string;
    userame : string;
    email: number;
    created_at: string;
    updated_at: string;
}

const item: Ref<User> = ref({} as User);
export const useUserStore = defineStore('users',  <T>() =>{
    const list = ref<T[] | null>([]);
    const loading = ref(false);

    const createItem = async (item: T) => {
        loading.value = true;
        const { data, error } = await supabase
            .from('users')
            .insert([item])
            .select();
        if (error) {
            console.error('Erro ao criar gamificação:', error);
        } else {
            list.value.push(data[0]);
        }
        loading.value = false;
    };

    const setItem = (_item: User) => {
        item.value = _item;
    }

    const getList = async () => {
        loading.value = true;
        const { data, error } = await supabase.from('users').select();
        list.value = data as T[];
        if (error) {
            console.error('Erro ao obter gamificações:', error);
        }
        loading.value = false;
    };

    // Atualizar um registro de gamificação
    const updateItem = async (id: number, updatedData: Partial<T>) => {
        const { data, error } = await supabase
            .from('users')
            .update(updatedData)
            .eq('usersid', id);

        if (error) {
            console.error('Erro ao atualizar gamificação:', error);
        } else {
            const index = list.value.findIndex(g => g.id === id);
            if (index !== -1) {
                list.value[index] = { ...list.value[index], ...updatedData };
            }
        }
    };

    const deleteItem = async (id: string) => {
        const { error } = await supabase.from('users').delete().eq('id', id);
        if (error) {
            console.error('Unable to remove item:', error);
        } else {
            list.value = list.value.filter(g => g.id !== id);
        }
    };

    return {
        list,
        item,
        loading,
        setItem,
        createItem,
        getList,
        updateItem,
        deleteItem,
    };
});
