<template>
  <div class="input-search">
    <input
      class="input-search__input"
      type="text"
      v-model="search"
      @input="handleInput"
      placeholder="Enter the name of the city"
    >
    <select
      v-model="selectedCity"
    >
      <option
        value=""
      >
        Выберите город
      </option>
      <option
        v-for="city in cities"
        :key="city.name"
        :value="city.name"
      >
        {{ city.name }}
      </option>
    </select>
  </div>
</template>

<script>
// import { debounce } from 'lodash';
import { mapActions } from "vuex";
export default {
  name: 'InputSearch',
  data () {
    return {
      search: '',
      cities: [],
      selectedCity: ''
    }
  },
  methods: {
    ...mapActions('weatherData', ['getWeatherByCity', 'getLocation']),
    handleInput () {
      this.getLocation(this.search)
      // debounce(function () {
      //   this.getWeatherByCity(this.search)
      // }, 500)
    },
  }
}
</script>

<style scoped lang="scss">
.input-search {
  display: flex;
  justify-content: center;

  .input-search__input {
    width: 300px;
    padding: 12px 20px;
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
}
</style>
