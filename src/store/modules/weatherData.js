// import axiosInstanceWeather from '../../services/instanceWeather'
import axiosInstanceGoogle from '../../services/instanceGoogleApi'
const state = {
  title: 'Hello'
}
const mutations = {
  SET_TITLE: (state, payload) => {
    state.title = payload
  }
}
const actions = {
  getLocation: async ({ commit }, payload) => {
    try {
      const cityList = await axiosInstanceGoogle.get(`/maps/api/place/autocomplete/json?input=${ payload }&types=(cities)&key=${ process.env.VUE_APP_API_KEY_GOOGLE }`)
      console.log(cityList)
      console.log(commit)
    } catch (e) {
      console.log(e)
    }
  },
  // getWeatherByCity: async ({ commit }, payload) => {
  //   try {
  //
  //     const weatherCityData = await axiosInstanceWeather.get(`/data/2.5/weather?q=${ payload }&appid=${ process.env.VUE_APP_API_KEY }`)
  //     console.log(weatherCityData)
  //     console.log(commit)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
}
const getters = {
  title: state => state.title
}

export default {
  state,
  mutations,
  actions,
  getters
}
