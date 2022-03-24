import lecturesApi from '../api/lectures.api'

export function fetch() {
  return new Promise((resolve, reject) => {

    lecturesApi.find().then((response) =>{
      resolve(response.data)
    }).catch((_error) => {
      reject(new Error('Não foi possível recuperar a lista de serviços'))
    })
  })
}
