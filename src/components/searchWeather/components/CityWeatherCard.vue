<template>
  <div
    class="city-card__wrapper"
  >
    <ModalComponent
      v-if="isOpenModal"
      @delete="removeItem"
    />
    <LimitModal
      v-if="isLimitExceeded"
    />
    <div class="city-card__item">
      <h3 class="city-card__title">
        Weather data
      </h3>
      <div class="city-card__item-action">
        <div class="item-action__group-days">
          <button class="item-action__button">
            Day
          </button>
          <button class="item-action__button">
            5 days
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
            Favorites
          </button>
          <button
            v-if="selectedCity.isShowAddButton"
            class="item-action__button--green"
            @click="addBlockToList()"
          >
            + Add block
          </button>
          <button
            v-if="selectedCity.isShowDeleteButton"
            class="item-action__button--red"
            @click="openModal()"
          >
            Delete
          </button>
        </div>
      </div>
      <div class="city-card__description">
        <p class="city-card__city">
          City:
          <span class="bold">
            {{ selectedCity.city.name }}
          </span>
        </p>
        <p class="city-card__population">
          Population:
          <span class="bold">
            {{ selectedCity.city.population }}
          </span>
        </p>
        <p class="city-card__sunrise">
          Sunrise:
          <span class="bold">
            {{ formattedTime(selectedCity.city.sunrise) }}
          </span>
        </p>
        <p class="city-card__sunset">
          Sunset:
          <span class="bold">
            {{ formattedTime(selectedCity.city.sunset) }}
          </span>
        </p>
      </div>
      <BarChart
        :labels="labelsForBarChart"
        :chart-indicators="chartIndicators"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import BarChart from "@/components/searchWeather/components/BarChart.vue";
import ModalComponent from "@/views/Modal.vue";
import LimitModal from "@/views/LimitModal.vue";

export default {
  name: 'CityWeatherCard',
  components: {LimitModal, ModalComponent, BarChart },
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
      labelsForBarChart: [],
      chartIndicators: []
    }
  },
  computed: {
    ...mapGetters('weatherData', ['isOpenModal', 'isLimitExceeded']),
    filteredOnToday() {
      const today = new Date().toISOString().slice(0, 10)
      return this.selectedCity.list.filter(item => item.dt_txt.slice(0, 10) === today)
    }
  },
  methods: {
    ...mapActions('weatherData', ['addItemToBlockList', 'removeItemFromBlockList', 'addItemToFavoriteList', 'removeItemFromFavorite']),
    formattedTime (time) {
      const sunriseDate = new Date(time * 1000)
      return sunriseDate.toLocaleTimeString()
    },
    getTimeLabelsArray(dateArray) {
      const timeArray = []
      for (let i = 0; i < dateArray.length; i++) {
        const dt = new Date(dateArray[i].dt_txt)
        const hours = dt.getHours().toString().padStart(2, '0')
        const minutes = dt.getMinutes().toString().padStart(2, '0')
        const timeString = `${hours}:${minutes}`
        timeArray.push(timeString)
      }
      return timeArray
    },
    getTemperatures(dateArray) {
      return dateArray.map(({ main }) => main.temp)
    },
    setDataForBarChart () {
      this.labelsForBarChart = this.getTimeLabelsArray(this.filteredOnToday)
      this.chartIndicators = this.getTemperatures(this.filteredOnToday)
    },
    addBlockToList () {
      this.addItemToBlockList({...this.selectedCity, isShowAddButton: false, isShowDeleteButton: true})
    },
    removeItem () {
      if (this.selectedCity.isFavorite) {
        this.removeItemFromFavorite(this.selectedCity.city.id)
        this.$store.commit('weatherData/SET_IS_OPEN_MODAL', false)
      } else {
        this.removeItemFromBlockList(this.selectedCity.city.id)
        this.$store.commit('weatherData/SET_IS_OPEN_MODAL', false)
      }
    },
    addToFavoritesList () {
      this.addItemToFavoriteList({...this.selectedCity, isShowAddButton: false, isShowDeleteButton: true, isFavorite: true})
    },
    openModal () {
      this.$store.commit('weatherData/SET_IS_OPEN_MODAL', true)
    }
  },
  watch: {
    selectedCity: {
      handler () {
        this.setDataForBarChart()
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
  margin: 20px 10px;
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
      .item-action__group-days :first-child,
      .item-action__group-control :first-child{
        margin-right: 10px;
      }
      .item-action__group-control {
        display: flex;
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
        margin-right: 10px;
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
