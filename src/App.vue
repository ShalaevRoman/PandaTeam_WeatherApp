<template>
  <div id="app">
    <MainView />
  </div>
</template>

<script>
import MainView from '@/views/MainView.vue'
import axios from 'axios'
import {mapActions} from "vuex";
export default {
  name: 'App',
  components: {MainView},
  comments: {
    MainView
  },
  data () {
    return {
    }
  },
  mounted() {
    this.getLocIp()
  },
  methods: {
    ...mapActions('weatherData', ['getWeatherByGeo']),
    async getLocIp () {
      try {
        const response = await axios.get(`https://ipinfo.io/json?token=${process.env.VUE_APP_TOKEN}`)
        const { loc } = response.data
        const [latitude, longitude] = loc.split(',')
        await this.getWeatherByGeo({ lat: latitude, lon: longitude, local: this.$i18n.locale })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="scss">
@import "../css/globalCSS.css";
#app {
  display: flex;
  justify-content: center;
}
</style>
