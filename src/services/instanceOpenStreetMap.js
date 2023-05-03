import axios from 'axios'

const BASE_URL = process.env.VUE_APP_BASE_URL_OPENSTREETMAP

const instanceOpenStreetMap = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': "application/json",
  }
})

const responseHandler = async (response) => {
  return response
}
const responseErrorHandler = async (error) => {
  return error
}

instanceOpenStreetMap.defaults.baseURL = BASE_URL
instanceOpenStreetMap.interceptors.response.use(responseHandler, responseErrorHandler)

export default instanceOpenStreetMap
