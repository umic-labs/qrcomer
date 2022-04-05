import { SERVICES } from './endpoints'
import http from './http'

const servicesApi = {
  redeem({ attendee, appointment }) {
    return http.patch(SERVICES, null, { params: { attendee, appointment }})
  },

  findOne({ attendee, appointment }) {
    return http.get(SERVICES, { params: { appointment, attendee }})
  }
}

export default servicesApi