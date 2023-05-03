<template>
  <section class="search-weather">
    <h1 class="search-weather__title">
      Choose a city and check the weather
    </h1>
    <SearchServices />
    <CityWeatherCard />
  </section>
</template>

<script>
import SearchServices from "@/components/searchWeather/components/SearchServices.vue";
import CityWeatherCard from "@/components/searchWeather/components/CityWeatherCard.vue";

export default {
  name: 'SearchWeather',
  components: {CityWeatherCard, SearchServices },
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
