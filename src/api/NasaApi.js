const axios = require('axios')

const api = process.env.VUE_APP_API_URL

function getNeos(date) {
  return axios.get(`${api}/api/v1/neos/${date}`).then(res => res)
}

function getApod(date) {
  return axios.get(`${api}/api/v1/apod/${date}`).then(res => res)
}

function getWeather() {
  return axios.get(`${api}/api/v1/marsweather`).then(res => res)
}

module.exports = {
  getNeos,
  getApod,
  getWeather,
}
