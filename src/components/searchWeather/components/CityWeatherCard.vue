<template>
  <div
    class="city-card__wrapper"
  >
    <div class="city-card__item">
      <h3 class="city-card__title">
        {{ $t('cityCardTitle') }}
      </h3>
      <div class="city-card__item-action">
        <div class="item-action__group-days">
          <button
            @click="setDataForBarChartOnToday()"
            class="item-action__button"
          >
            {{ $t('buttonDay') }}
          </button>
          <button
            @click="setDataForBarCharOnFiveDay()"
            class="item-action__button"
          >
            {{ $t('button6Days') }}
          </button>
        </div>
        <div class="item-action__group-control">
          <div
            v-if="selectedCity.isFavorite"
            class="item-action-favorite-icon"
          >
            <img
              src="../../../assets/rating.png"
              alt="favorite"
            >
          </div>
          <button
            v-if="!selectedCity.isFavorite"
            @click="addToFavoritesList()"
            class="item-action__button--yellow"
          >
            {{ $t('buttonFavorites') }}
          </button>
          <button
            v-if="selectedCity.isShowAddButton"
            class="item-action__button--green"
            @click="addBlockToList()"
          >
            {{ $t('buttonAddBlock') }}
          </button>
          <button
            v-if="selectedCity.isShowDeleteButton"
            class="item-action__button--red"
            @click="removeItem()"
          >
            {{ $t('buttonDelete') }}
          </button>
        </div>
      </div>
      <div class="city-card__description">
        <p class="city-card__city">
          {{ $t('city') }}
          <span class="bold">
            {{ selectedCity.city.name }}
          </span>
        </p>
        <p class="city-card__population">
          {{ $t('population') }}
          <span class="bold">
            {{ selectedCity.city.population }}
          </span>
        </p>
        <p class="city-card__sunrise">
          {{ $t('sunrise') }}
          <span class="bold">
            {{ formattedTime(selectedCity.city.sunrise) }}
          </span>
        </p>
        <p class="city-card__sunset">
          {{ $t('sunset') }}
          <span class="bold">
            {{ formattedTime(selectedCity.city.sunset) }}
          </span>
        </p>
      </div>
      <BarChart
        :chart-name="chartName"
        :labels="labelsForBarChart"
        :chart-indicators="chartIndicators"
      />
    </div>
  </div>
</template>

<script>
import barChartDataMixin from '@/mixins/barChartData.mixin'
import { mapActions, mapGetters } from 'vuex'
import BarChart from '@/components/searchWeather/components/BarChart.vue'

export default {
  name: 'CityWeatherCard',
  mixins: [ barChartDataMixin ],
  components: { BarChart },
  props: {
    selectedCity: {
      required: true,
      type: Object,
      default () {
        return null
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('weatherData', [
      'weatherBlockList',
      'favoritesList'
    ])
  },
  methods: {
    ...mapActions('weatherData', [
      'addItemToBlockList',
      'removeItemFromBlockList',
      'addItemToFavoriteList',
      'removeItemFromFavorite'
    ]),
    formattedTime (time) {
      const sunriseDate = new Date(time * 1000)
      return sunriseDate.toLocaleTimeString()
    },
    addBlockToList () {
      if (this.isObjectAlreadyExist(this.selectedCity.city.id, this.weatherBlockList)) {
        this.$store.commit('weatherData/SET_MODAL_DESCRIPTION', {title: 'Ooops...', subTitle: 'This block already exists'})
        this.$store.commit('weatherData/SET_IS_LIMIT_STATE', true)
      } else if (this.weatherBlockList.length >= 5) {
        this.$store.commit('weatherData/SET_MODAL_DESCRIPTION', {title: 'Limit exceeded', subTitle: 'Delete one element to add a new one'})
        this.$store.commit('weatherData/SET_IS_LIMIT_STATE', true)
      } else { this.addItemToBlockList({...this.selectedCity, isShowAddButton: false, isShowDeleteButton: true}) }
    },
    removeItem () {
      this.$store.commit('weatherData/SET_IS_OPEN_MODAL', true)
      this.$store.commit('weatherData/SET_SEARCH_ITEM', {id: this.selectedCity.city.id, isFavorite: this.selectedCity.isFavorite || false })
    },
    addToFavoritesList () {
      if (this.isObjectAlreadyExist(this.selectedCity.city.id, this.favoritesList)) {
        this.$store.commit('weatherData/SET_MODAL_DESCRIPTION', {title: 'Sorry...', subTitle: 'This city already in favorites'})
        this.$store.commit('weatherData/SET_IS_LIMIT_STATE', true)
      } else if (this.favoritesList.length >= 5) {
        this.$store.commit('weatherData/SET_MODAL_DESCRIPTION', {title: 'Limit exceeded', subTitle: 'Delete one element to add a new one'})
        this.$store.commit('weatherData/SET_IS_LIMIT_STATE', true)
      } else { this.addItemToFavoriteList({...this.selectedCity, isShowAddButton: false, isShowDeleteButton: true, isFavorite: true}) }
    },
    isObjectAlreadyExist (id, array) {
      return array.some(item => item.city.id === id)
    }
  },
  watch: {
    selectedCity: {
      handler () {
        this.setDataForBarChartOnToday()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
.city-card__wrapper {
  display: flex;
  justify-content: center;
  margin: 42px 10px 10px 10px;
  .city-card__item {
    width: 45%;
    max-width: 600px;
    min-width: 300px;
    min-height: 300px;
    height: 480px;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 10px;
    background: rgb(34,193,195);
    background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);
    .city-card__title {
      margin: 0;
      font-size: 24px;
      text-align: center;
      font-family: 'Ultra', sans-serif;
    }

    .city-card__item-action {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      .item-action__group-control,
      .item-action__group-days {
        display: flex;
        justify-content: space-between;
        .item-action-favorite-icon {
          width: 30px;
          height: 30px;
          img {
            width: 100%;
          }
        }
      }

      .item-action__button--yellow {
        background: #a8a02d;
        color: white;
      }
      .item-action__button--green {
        background: #288f5e;
        color: white;
      }
      .item-action__button--red {
        background: #8f3128;
        color: white;
      }
    }

    .city-card__city,
    .city-card__population,
    .city-card__sunrise,
    .city-card__sunset {
      font-family: 'Ultra', sans-serif;
    }
  }
  button {
    font-family: 'Ultra', sans-serif;
    border-radius: 5px;
    border: 1.5px solid gray;
    padding: 5px;
    cursor: pointer;
  }
  .bold {
    font-weight: bold;
  }
}

@media screen and (max-width: 460px) {
  .city-card__wrapper {
    .city-card__item {
      width: 100%;
      height: 380px;
    }
  }
}

@media screen and (max-width: 768px) {
  .city-card__wrapper {
    .city-card__item {
      height: 400px;
    }
  }
}
</style>
