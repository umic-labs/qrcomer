import { LECTURES } from './endpoints'
import http from './http'

const lecturesApi = {
  find() {
    return http.get(LECTURES)
  },
  findOne({ id }) {
    return http.get(LECTURES, { id })
  }
}

export default lecturesApi