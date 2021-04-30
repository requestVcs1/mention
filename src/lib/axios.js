import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://dncapi.bqrank.net/api/',
})
instance.interceptors.request.use(
  (req) => {
    return Promise.resolve(req)
  },
  (err) => {
    return Promise.reject(err)
  }
)
instance.interceptors.response.use(
  (res) => {
    return Promise.resolve(res)
  },
  (err) => {
    return Promise.reject(err)
  }
)
export default instance
