<template>
  <main class="main">
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'MainComponent',
  mounted() {
    const favoriteList = localStorage.getItem('favoriteList')
    const parsedFavoriteList = favoriteList ? JSON.parse(favoriteList) : []
    this.$store.commit('weatherData/SET_FAVORITE_LIST', parsedFavoriteList)
  }
}
</script>

<style scoped>

</style>
