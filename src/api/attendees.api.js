import { ATTENDEES } from './endpoints'
import http from './http'

const attendeesApi = {
  findOne({ attendee }) {
    const url = `${ATTENDEES}/${attendee}`
    return http.get(url)
  }
}

export default attendeesApi