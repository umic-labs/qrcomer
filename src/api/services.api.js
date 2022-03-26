import { SERVICES } from './endpoints'
import http from './http'

const servicesApi = {
  registerPresence({ attendee, meal, lecture }) {
    return http.patch(SERVICES, null, { params: { attendee, meal, lecture }})
  },

  findOne({ attendee, meal, lecture }) {
    return http.get(SERVICES, { params: { attendee, meal, lecture }})
  }
}

export default servicesApi