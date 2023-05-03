<template>
  <div class="favorites-wrapper">
    <h1 class="favorites-title">
      Favorites
    </h1>
    <div class="favorites-list">
      <CityWeatherCard
        v-for="(favorite, i) in favoritesList"
        :key="favorite.city.name + i"
        :selected-city="favorite"
      />
    </div>
  </div>
</template>

<script>
import CityWeatherCard from '@/components/searchWeather/components/CityWeatherCard.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'FavoritesComponent',
  components: { CityWeatherCard },
  computed: {
    ...mapGetters('weatherData', ['favoritesList']),
  }
}
</script>

<style scoped lang="scss">
.favorites-wrapper {
  width: 100%;
  .favorites-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
}
@media screen and (max-width: 460px) {
  .favorites-wrapper {
    .favorites-list {
      justify-content: center;
    }
  }
}
</style>
