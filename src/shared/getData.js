import Axios from 'axios'
import axios from './axios-feedback'

export function getFeedbackData() {
  return axios.get('feedback.json').then(res => res.data)
}

export function getTallies() {
  return axios.get('tallies.json').then(res => res.data)
}
