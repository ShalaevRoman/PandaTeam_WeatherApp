<template>
  <div
    v-if="isShowWeatherBlockList"
    class="blocks-list__wrapper"
  >
    <h1 class="blocks-list__title">
      Your weather blocks
    </h1>
    <div class="blocks-list__items">
      <CityWeatherCard
        v-for="(block, i) in weatherBlockList"
        :key="block.city.name + i"
        :selected-city="block"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CityWeatherCard from '@/components/searchWeather/components/CityWeatherCard.vue'

export default {
  name: 'CityWeatherBlocksList',
  components: { CityWeatherCard },
  computed: {
    ...mapGetters('weatherData', ['weatherBlockList', 'isShowWeatherBlockList']),
  }
}
</script>

<style scoped lang="scss">
.blocks-list__wrapper {
  width: 100%;
  .blocks-list__items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
  }
}

@media screen and (max-width: 720px) {
  .blocks-list__wrapper {
    .blocks-list__items {
      flex-direction: column;
    }
  }
}
</style>
