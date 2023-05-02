<template>
  <section class="search-weather">
    <h1 class="search-weather__title">
      Choose a city and check the weather
    </h1>
    <InputSearch />
  </section>
</template>

<script>
import InputSearch from "@/components/searchWeather/components/InputSearch.vue";

export default {
  name: 'SearchWeather',
  components: { InputSearch },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.search-weather {
  .search-weather__title {
  }
}
</style>
