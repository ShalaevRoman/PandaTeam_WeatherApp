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
  limitModalDescription: '',
  isOpenModal: false,
  isShowPreloader: false,
  searchItem: {}
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
  SET_MODAL_DESCRIPTION: (state, payload) => {
    state.limitModalDescription = payload
  },
  SET_IS_OPEN_MODAL: (state, payload) => {
    state.isOpenModal = payload
  },
  SET_IS_SHOW_PRELOADER: (state, payload) => {
    state.isShowPreloader = payload
  },
  SET_SEARCH_ITEM: (state, payload) => {
    state.searchItem = payload
  }
}
const actions = {
  getLocation: async ({ commit }, payload) => {
    try {
      commit('SET_IS_SHOW_PRELOADER', true)
      const response = await axiosInstanceOpenStreetMap.get(`/search?city=${payload}&format=geojson`)
      const { features } = response.data
      if (features.length) {
        commit('SET_CITY_LIST', features)
        commit('SET_IS_CITY_FOUND', false)
        commit('SET_IS_SHOW_PRELOADER', false)
      } else {
        commit('SET_IS_CITY_FOUND', true)
        commit('SET_CITY_LIST', [])
        commit('SET_IS_SHOW_PRELOADER', false)
      }
    } catch (e) {
      console.log(e)
    }
  },
  getWeatherByGeo: async ({ commit }, payload) => {
    try {
      commit('SET_IS_SHOW_PRELOADER', true)
      const response = await axiosInstanceWeather.get(`/data/2.5/forecast?lat=${payload.lat}&lon=${payload.lon}&lang=${payload.local}&appid=${process.env.VUE_APP_API_KEY_WEATHER}&units=metric`)
      commit('SET_SELECTED_CITY', { ...response.data, isShowAddButton: true, isShowDeleteButton: false })
      commit('SET_IS_SHOW_PRELOADER', false)
      commit('SET_SHOW_WEATHER_CARD', true)
    } catch (e) {
      console.log(e)
    }
  },
  addItemToBlockList: ({ commit }, payload) => {
    commit('ADD_ITEM_TO_LIST', payload)
    commit('SET_SHOW_BLOCK_LIST', true)
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
    commit('ADD_ITEM_TO_FAVORITES_LIST', payload)
    localStorage.setItem('favoriteList', JSON.stringify([...state.favoritesList]))
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
  favoritesList: state => state.favoritesList,
  isShowPreloader: state => state.isShowPreloader,
  searchItem: state => state.searchItem,
  limitModalDescription: state => state.limitModalDescription
}

export default {
  state,
  mutations,
  actions,
  getters
}
