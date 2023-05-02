import axios from 'axios'

const BASE_URL = process.env.VUE_APP_BASE_URL_GOOGLE

const instanceWeather = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': "application/json"
  }
})

const responseHandler = async (response) => {
  return response
}
const responseErrorHandler = async (error) => {
  return error
}

instanceWeather.defaults.baseURL = BASE_URL
instanceWeather.interceptors.response.use(responseHandler, responseErrorHandler)

export default instanceWeather
