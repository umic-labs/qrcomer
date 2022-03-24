import servicesApi from '../api/services.api'

export function update({ attendee, meal, lecture }) {
  return new Promise((resolve, reject) => {

    servicesApi.update({ attendee, meal, lecture }).then((response) =>{
      resolve(response.data)
    }).catch((_error) => {
      reject(new Error('Não foi registrar codigo'))
    })
  })
}
