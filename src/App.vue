<template>
  <div id="app">
    <MainView />
  </div>
</template>

<style lang="scss">
@import "../css/globalCSS.css";
#app {
  display: flex;
  justify-content: center;
}
</style>
<script setup>
import MainView from "@/views/MainView.vue";
</script>
