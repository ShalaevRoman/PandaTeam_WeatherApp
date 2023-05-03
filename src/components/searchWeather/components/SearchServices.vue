<template>
  <div class="input-search">
    <p
      v-if="isCityFound"
      class="input-search__error-text"
    >
      City not found
    </p>
    <input
      class="input-search__input"
      type="text"
      v-model="search"
      @input="handleInput"
      placeholder="Enter the name of the city"
    >
    <div
      v-if="isShowList"
      class="input-search__dropdown"
    >
      <div
        v-for="city in cityList"
        :key="city.properties.place_id"
        class="input-search__dropdown-item"
        @click="selectCity(city)"
      >
        {{ firstThreeWords(city.properties.display_name) }}
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash';
import {mapActions, mapGetters} from "vuex";
export default {
  name: 'SearchServices',
  data () {
    return {
      search: '',
    }
  },
  computed: {
    ...mapGetters('weatherData', ['cityList', 'isCityFound', 'selectedCity']),
    isShowList () {
      return  this.cityList.length > 0
    }
  },
  methods: {
    ...mapActions('weatherData', ['getWeatherByGeo', 'getLocation']),
    handleInput: debounce(function () {
        this.getLocation(this.search)
      }, 500),
    selectCity(city) {
      this.getWeatherByGeo({ lat: city.geometry.coordinates[1], lon: city.geometry.coordinates[0] })
      this.$store.commit('weatherData/SET_CITY_LIST', [])
      this.search = this.firstThreeWords(city.properties.display_name)
    },
    firstThreeWords(sentence) {
      return sentence.split(',').slice(0, 3).join(' ');
    }
  },
}
</script>

<style scoped lang="scss">
.input-search {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;

  .input-search__error-text {
    font-size: 10px;
    color: red;
    font-family: 'Ultra', sans-serif;
  }

  .input-search__input {
    width: 350px;
    padding: 15px;
    font-size: 12px;
    border: solid 1px gray;
    outline: transparent;
    font-family: 'Ultra', sans-serif;
    border-radius: 10px;
  }

  .input-search__input::placeholder {
    color: gray;
    font-size: 12px;
    font-family: 'Ultra', sans-serif;
  }

  .input-search__dropdown {
    max-height: 200px;
    min-width: 350px;
    max-width: 350px;
    padding: 12px;
    position: absolute;
    top: 50px;
    background-color: #dcdcdc;
    border: 1px solid #3d3d3d;
    border-radius: 10px;
    z-index: 1;
    overflow-y: scroll;

    .input-search__dropdown-item {
      padding: 15px;
      border-radius: 10px;
      cursor: pointer;
      font-family: 'Ultra', sans-serif;
    }

    .input-search__dropdown-item:hover {
      background-color: #ccc;
    }
  }
}
</style>
