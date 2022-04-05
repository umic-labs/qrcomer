import lecturesApi from '../api/lectures.api'
import mealsApi from '../api/meals.api'
import workshopsApi from '../api/workshops.api'

const apiOptions = {
  lecture: lecturesApi,
  meal: mealsApi,
  workshop: workshopsApi,
}

export function fetch({ type }) {
  const api = apiOptions[type]

  return new Promise((resolve, reject) => {
    api.find().then((response) =>{
      resolve(response.data)
    }).catch((_error) => {
      reject(new Error('Não foi possível recuperar a lista de serviços'))
    })
  })
}
