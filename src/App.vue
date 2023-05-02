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
  background: rgb(41,170,90);
  background: radial-gradient(circle, rgba(41,170,90,1) 0%, rgba(17,40,16,1) 80%);
}
</style>
<script setup>
import MainView from "@/views/MainView.vue";
</script>
