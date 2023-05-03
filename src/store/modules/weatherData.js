import axiosInstanceWeather from '../../services/instanceWeather'
import axiosInstanceOpenStreetMap from '../../services/instanceOpenStreetMap'
const state = {
  cityList: [],
  selectedCity: {},
  isCityFound: false,
  isShowWeatherCard: false,
  isShowWeatherBlockList: false,
  weatherBlockList: [],
  favoritesList: [],
  isLimitExceeded: false,
  isOpenModal: false
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
  },
  SET_SHOW_BLOCK_LIST: (state, payload) => {
  state.isShowWeatherBlockList = payload
},
  ADD_ITEM_TO_LIST: (state, payload) => {
    state.weatherBlockList.push(payload)
  },
  ADD_ITEM_TO_FAVORITES_LIST: (state, payload) => {
    state.favoritesList.push(payload)
  },
  SET_WEATHER_BLOCK_LIST: (state, payload) => {
    state.weatherBlockList = payload
  },
  SET_FAVORITE_LIST: (state, payload) => {
    state.favoritesList = payload
  },
  SET_IS_LIMIT_STATE: (state, payload) => {
    state.isLimitExceeded = payload
  },
  SET_IS_OPEN_MODAL: (state, payload) => {
    state.isOpenModal = payload
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
      const response = await axiosInstanceWeather.get(`/data/2.5/forecast?lat=${payload.lat}&lon=${payload.lon}&appid=${process.env.VUE_APP_API_KEY_WEATHER}&units=metric`)
      commit('SET_SELECTED_CITY', { ...response.data, isShowAddButton: true, isShowDeleteButton: false })
      commit('SET_SHOW_WEATHER_CARD', true)
    } catch (e) {
      console.log(e)
    }
  },
  addItemToBlockList: ({ commit, state }, payload) => {
    if (state.weatherBlockList.length >= 5) {
      commit('SET_IS_LIMIT_STATE', true)
    } else {
      commit('ADD_ITEM_TO_LIST', payload)
      commit('SET_SHOW_BLOCK_LIST', true)
    }
  },
  removeItemFromBlockList: ({ commit, state }, payload) => {
    const newList = state.weatherBlockList.filter(item => item.city.id !== payload)
    if (state.weatherBlockList.length <= 1) {
      commit('SET_WEATHER_BLOCK_LIST', newList)
      commit('SET_SHOW_BLOCK_LIST', false)
    } else {
      commit('SET_WEATHER_BLOCK_LIST', newList)
    }
  },
  addItemToFavoriteList: ({ commit, state }, payload) => {
    if (state.favoritesList.length >= 5) {
      commit('SET_IS_LIMIT_STATE', true)
    } else {
      commit('ADD_ITEM_TO_FAVORITES_LIST', payload)
      localStorage.setItem('favoriteList', JSON.stringify([...state.favoritesList]))
    }
  },
  removeItemFromFavorite: ({ commit, state }, payload) => {
    const newList = state.favoritesList.filter(item => item.city.id !== payload)
    commit('SET_FAVORITE_LIST', newList)
    localStorage.setItem('favoriteList', JSON.stringify([...state.favoritesList]))
  }
}
const getters = {
  cityList: state => state.cityList,
  isCityFound: state => state.isCityFound,
  selectedCity: state => state.selectedCity,
  isShowWeatherCard: state => state.isShowWeatherCard,
  weatherBlockList: state => state.weatherBlockList,
  isLimitExceeded: state => state.isLimitExceeded,
  isShowWeatherBlockList: state => state.isShowWeatherBlockList,
  isOpenModal: state => state.isOpenModal,
  favoritesList: state => state.favoritesList
}

export default {
  state,
  mutations,
  actions,
  getters
}
