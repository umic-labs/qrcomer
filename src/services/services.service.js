import servicesApi from '../api/services.api'

export function registerPresence({ attendee, meal, lecture }) {
  return new Promise((resolve, reject) => {

    servicesApi.registerPresence({ attendee, meal, lecture }).then((response) =>{
      resolve(response.data)
    }).catch((_error) => {
      reject(new Error('Não foi possivel carimbar'))
    })
  })
}

export function findOne({ attendee, meal, lecture }) {
  return new Promise((resolve, reject) => {

    servicesApi.findOne({ attendee, meal, lecture }).then((response) =>{
      resolve(response.data)
    }).catch((_error) => {
      reject(new Error('Não foi possivel encontrar servico para esse congressista'))
    })
  })
}
