<template>
  <section class="search-weather">
    <h1 class="search-weather__title">
      Choose a city and check the weather
    </h1>
    <SearchServices />
    <CityWeatherCard
      v-if="isShowWeatherCard"
      :selected-city="selectedCity"
    />
    <CityWeatherBlocksList />
  </section>
</template>

<script>
import SearchServices from "@/components/searchWeather/components/SearchServices.vue";
import CityWeatherCard from "@/components/searchWeather/components/CityWeatherCard.vue";
import CityWeatherBlocksList from "@/components/searchWeather/components/CityWeatherBlocksList.vue";
import {mapGetters} from "vuex";

export default {
  name: 'SearchWeather',
  components: {CityWeatherBlocksList, CityWeatherCard, SearchServices },
  computed: {
    ...mapGetters('weatherData', ['selectedCity', 'isShowWeatherCard']),
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.search-weather {
  width: 100%;
  .search-weather__title {
  }
}
</style>
