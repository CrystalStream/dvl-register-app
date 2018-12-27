import * as axios from 'axios'

const instance = axios.create({
  baseURL: 'http://192.168.0.13:5000/api',
  timeout: 6000
})

export default instance
