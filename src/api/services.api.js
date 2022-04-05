import { SERVICES } from './endpoints'
import http from './http'

const servicesApi = {
  redeem({ attendee, appointment }) {
    return http.patch(SERVICES, null, { params: { attendee, appointment }})
  },

  findOne({ attendee, appointment }) {
    const url = `${SERVICES}/appointment/${appointment}`
    return http.get(url, { params: { attendee }})
  }
}

export default servicesApi