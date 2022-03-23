import mealsApi from '../api/meals'

export function fetch() {
  return new Promise((resolve, reject) => {

    mealsApi.find().then((response) =>{
      resolve(response.data)
    }).catch((_error) => {
      reject(new Error('Não foi possível recuperar a lista de refeições'))
    })
  })
}
