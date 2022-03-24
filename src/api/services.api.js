import { SERVICES } from './endpoints'
import http from './http'

const servicesApi = {
  update({ attendee, meal, lecture }) {
    return http.patch(SERVICES, null, { params: { attendee, meal, lecture }})
  }
}

export default servicesApi