<template>
  <section class="search-weather">
    <h1 class="search-weather__title">
      {{ $t('searchWeatherTitle') }}
    </h1>
    <ModalComponent
      v-if="isOpenModal"
    />
    <LimitModal
      v-if="isLimitExceeded"
    />
    <SearchServices />
    <CityWeatherCard
      v-if="isShowWeatherCard"
      :selected-city="selectedCity"
    />
    <CityWeatherBlocksList />
  </section>
</template>

<script>
import SearchServices from '@/components/searchWeather/components/SearchServices.vue'
import CityWeatherCard from '@/components/searchWeather/components/CityWeatherCard.vue'
import CityWeatherBlocksList from '@/components/searchWeather/components/CityWeatherBlocksList.vue'
import { mapGetters } from 'vuex'
import LimitModal from '@/views/modals/LimitModal.vue'
import ModalComponent from '@/views/modals/Modal.vue'

export default {
  name: 'SearchWeather',
  components: {
    CityWeatherBlocksList,
    CityWeatherCard,
    SearchServices,
    LimitModal,
    ModalComponent
  },
  computed: {
    ...mapGetters('weatherData', [
      'selectedCity',
      'isShowWeatherCard',
      'isOpenModal',
      'isLimitExceeded'
    ])
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
