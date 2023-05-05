<template>
  <div class="input-search">
    <p
      v-if="isCityFound"
      class="input-search__error-text"
    >
      {{ $t('inputSearchErrorText') }}
    </p>
    <input
      class="input-search__input"
      type="text"
      v-model="search"
      @input="handleInput"
      :placeholder="$t('inputSearchPlaceholder')"
    >
    <PreloaderComponent
      v-if="isShowPreloader"
    />
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
import PreloaderComponent from "@/views/modals/Preloader.vue";
export default {
  name: 'SearchServices',
  components: {PreloaderComponent},
  data () {
    return {
      search: '',
    }
  },
  computed: {
    ...mapGetters('weatherData', ['cityList', 'isCityFound', 'selectedCity', 'isShowPreloader']),
    isShowList () {
      return  this.cityList.length > 0
    }
  },
  methods: {
    ...mapActions('weatherData', ['getWeatherByGeo', 'getLocation']),
    handleInput: debounce(function () {
        this.getLocation(this.search)
      }, 600),
    selectCity(city) {
      this.getWeatherByGeo({ lat: city.geometry.coordinates[1], lon: city.geometry.coordinates[0], local: this.$i18n.locale })
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
    position: absolute;
    top: -25px;
    font-size: 14px;
    color: red;
    font-family: 'Ultra', sans-serif;
  }

  .input-search__input {
    margin-top: 15px;
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
    background-color: white;
    top: 70px;
    border: 1px solid gray;
    border-radius: 10px 0 0 10px;
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

@media screen and (max-width: 460px) {
  .input-search {

    .input-search__input {
      width: 310px;
    }

    .input-search__dropdown {
      min-width: 310px;
      max-width: 310px;
    }
  }
}
</style>
