import axiosInstanceWeather from '../../services/instanceWeather'
import axiosInstanceOpenStreetMap from '../../services/instanceOpenStreetMap'
const state = {
  cityList: [],
  selectedCity: {},
  isCityFound: false,
  isShowWeatherCard: false
}
const mutations = {
  SET_CITY_LIST: (state, payload) => {
    state.cityList = payload
  },
  SET_IS_CITY_FOUND: (state, payload) => {
    state.isCityFound = payload
  },
  SET_SELECTED_CITY: (state, payload) => {
    state.selectedCity = payload
  },
  SET_SHOW_WEATHER_CARD: (state, payload) => {
    state.isShowWeatherCard = payload
  }
}
const actions = {
  getLocation: async ({ commit }, payload) => {
    try {
      const response = await axiosInstanceOpenStreetMap.get(`/search?city=${payload}&format=geojson`)
      const { features } = response.data
      if (features.length) {
        commit('SET_CITY_LIST', features)
        commit('SET_IS_CITY_FOUND', false)
      } else {
        commit('SET_IS_CITY_FOUND', true)
        commit('SET_CITY_LIST', [])
      }
    } catch (e) {
      console.log(e)
    }
  },
  getWeatherByGeo: async ({ commit }, payload) => {
    try {
      commit('SET_SHOW_WEATHER_CARD', false)
      const response = await axiosInstanceWeather.get(`/data/2.5/forecast?lat=${payload.lat}&lon=${payload.lon}&appid=${process.env.VUE_APP_API_KEY_WEATHER}&units=metric`)
      commit('SET_SELECTED_CITY', { ...response.data, isShowAddButton: true })
      commit('SET_SHOW_WEATHER_CARD', true)
    } catch (e) {
      console.log(e)
    }
  }
}
const getters = {
  cityList: state => state.cityList,
  isCityFound: state => state.isCityFound,
  selectedCity: state => state.selectedCity,
  isShowWeatherCard: state => state.isShowWeatherCard
}

export default {
  state,
  mutations,
  actions,
  getters
}
