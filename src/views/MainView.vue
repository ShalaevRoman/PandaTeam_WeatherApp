<template>
  <div class="grid-wrapper">
    <HeaderComponent />
    <MainComponent />
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header.vue'
import MainComponent from '@/components/Main.vue'
import FooterComponent from '@/components/Footer.vue'

export default {
  name: 'MainView',
  components: {
    MainComponent,
    FooterComponent,
    HeaderComponent
  }
}
</script>

<style lang="scss">
.grid-wrapper {
  display: grid;
  grid-template-areas: 'header' 'main' 'footer';
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  width: 100%;
  max-width: 1200px;
  min-width: 360px;
  margin: 0 10px;
}
</style>
