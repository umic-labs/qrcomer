import attendeeApi from '../api/attendees.api'

export function findOne({ attendee }) {
  return new Promise((resolve, reject) => {

    attendeeApi.findOne({ attendee }).then((response) =>{
      resolve(response.data)
    }).catch((error) => {
      if(error.response.status === 404) {
        reject(new Error('Congressista não encontrado'))
      }
    })
  })
}
