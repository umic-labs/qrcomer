import { WORKSHOPS } from './endpoints'
import http from './http'

const workshopsApi = {
  find() {
    return http.get(WORKSHOPS)
  },
  findOne({ id }) {
    return http.get(WORKSHOPS, { id })
  }
}

export default workshopsApi