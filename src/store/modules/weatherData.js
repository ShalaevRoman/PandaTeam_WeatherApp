const state = {
  title: 'Hello'
}
const mutations = {
  SET_TITLE: (state, payload) => {
    state.title = payload
  }
}
const actions = {

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
