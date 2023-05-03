<template>
  <div
    v-if="isShowWeatherCard"
    class="city-card__wrapper"
  >
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
          <button class="item-action__button--yellow">
            Favorites
          </button>
          <button
            v-if="selectedCity.isShowAddButton"
            class="item-action__button--green"
          >
            + Add block
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'CityWeatherCard',
  data () {
    return {}
  },
  computed: {
    ...mapGetters('weatherData', ['selectedCity', 'isShowWeatherCard']),
    filteredItems() {
      const today = new Date().toISOString().slice(0, 10)
      return this.selectedCity.list.filter(item => item.dt_txt.slice(0, 10) === today)
    }
  },
  methods: {
    formattedTime (time) {
      const sunriseDate = new Date(time * 1000)
      return sunriseDate.toLocaleTimeString()
    }
  },
  watch: {
    selectedCity (newValue) {
      console.log(newValue)
      const list = this.filteredItems
      console.log(list)
    }
  }
}
</script>

<style scoped lang="scss">
.city-card__wrapper {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  .city-card__item {
    width: 50%;
    height: 500px;
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
      .item-action__button--yellow {
        background: #a8a02d;
        color: white;
      }
      .item-action__button--green {
        background: #288f5e;
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
</style>
