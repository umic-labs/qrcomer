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
    }).catch((_error) => {
      reject(new Error('Não foi possivel encontrar servico para esse congressista'))
    })
  })
}
