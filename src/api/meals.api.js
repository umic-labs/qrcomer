import { MEALS } from './endpoints'
import http from './http'

const mealsApi = {
  find() {
    return http.get(MEALS)
  },
  findOne({ id }) {
    return http.get(MEALS, { id })
  }
}

export default mealsApi