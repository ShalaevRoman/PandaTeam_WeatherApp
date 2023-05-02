import axios from 'axios'

const BASE_URL = process.env.VUE_APP_BASE_URL_GOOGLE

const instanceGoogleApi = axios.create({
  baseURL: BASE_URL,
  headers: {

  }
})

const responseHandler = async (response) => {
  return response
}
const responseErrorHandler = async (error) => {
  return error
}

instanceGoogleApi.defaults.baseURL = BASE_URL
instanceGoogleApi.interceptors.response.use(responseHandler, responseErrorHandler)

export default instanceGoogleApi
