import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://fizzy-feedback.firebaseio.com/',
})

export default instance
