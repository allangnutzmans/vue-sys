<script setup lang="ts">
import Header from "./Header.vue";
import SideNav from "./sidenav/SideNav.vue";
import DefaultTable from "@/components/table/TableView.vue";
</script>

<template>
  <DefaultTable />
<!--  <Header />
  <SideNav />-->
  <RouterView />
</template>