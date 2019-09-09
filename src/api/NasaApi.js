const axios = require('axios')

function getNeos(date) {
  return axios.get(`http://localhost:8000/api/v1/neos/${date}`).then(res => res)
}

function getApod(date) {
  return axios.get(`http://localhost:8080/api/v1/apod/${date}`).then(res => res)
}

module.exports = {
  getNeos,
  getApod,
}
