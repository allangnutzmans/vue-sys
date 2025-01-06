<script setup lang="ts">
/*import Header from './Header.vue';
import SideNav from './sidenav/SideNav.vue';*/
import DefaultTable from '@/components/table/TableView.vue';
</script>

<template>
    <div class="main">
        <DefaultTable />
        <RouterView />
    </div>

    <!--  <Header />
  <SideNav />-->

</template>

<style scoped>

</style>