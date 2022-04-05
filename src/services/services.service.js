import servicesApi from '../api/services.api'

export function redeem({ attendee, appointment }) {
  return new Promise((resolve, reject) => {

    servicesApi.redeem({ attendee, appointment }).then((response) =>{
      resolve(response.data)
    }).catch((_error) => {
      reject(new Error('Não foi possivel carimbar'))
    })
  })
}

export function findOne({ attendee, appointment }) {
  return new Promise((resolve, reject) => {

    servicesApi.findOne({ attendee, appointment }).then((response) =>{
      resolve(response.data)
    }).catch((error) => {
      if(error.response.status === 404) {
        reject(new Error('Congressista não cadastrado para este encontro'))
      }
    })
  })
}
