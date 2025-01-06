import type { Icon as IconType } from '@tabler/icons-vue';

export type NavItemType = {
    label: string;
    icon?: IconType;
    badge?: number;
    children?: NavItemType[];
} & (
    | { to: string; children?: never } // Se não tiver children, to deve ser uma string
    | { to?: never; children: NavItemType[] } // Se tiver children, to deve ser omitido
);
