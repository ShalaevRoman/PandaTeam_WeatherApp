import axios from 'axios'

const BASE_URL =''

const instance = axios.create({
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

instance.defaults.baseURL = BASE_URL
instance.interceptors.response.use(responseHandler, responseErrorHandler)
