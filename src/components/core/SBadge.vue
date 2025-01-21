<script setup lang="ts">
interface Badge {
    badge: 'Master' | 'Beginner' | 'Veteran' | 'Achiever' | 'Explorer';
}

defineProps<{ badge: Badge['badge'] }>();

const badgeColors: Record<Badge['badge'], string> = {
    Master: 'bg-purple-500 text-white',
    Beginner: 'bg-blue-500 text-white',
    Veteran: 'bg-green-500 text-white',
    Achiever: 'bg-orange-500 text-white',
    Explorer: 'bg-teal-500 text-white',
};

// Function to determine badge classes based on the badge type
const badgeClasses = (badge: Badge['badge']) => {
    return `inline-block px-2 py-1 rounded-full ${badgeColors[badge] || 'bg-gray-300 text-gray-700'}`;
};
</script>

<template>
  <span :class="badgeClasses(badge)">
    {{ badge }}
  </span>
</template>
