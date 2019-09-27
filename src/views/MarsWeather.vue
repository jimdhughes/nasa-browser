<template>
  <v-layout column>
    <h3>Mars Weather</h3>
    <v-flex xs12 v-if="loading" justify="center">
      <v-progress-circular size="32" width="4" :indeterminate="true" color="light-blue"></v-progress-circular>
    </v-flex>
    <v-flex xs12 v-if="weather && weather.sol_keys === null">
      <p>No SOL's Reporting. Check back later</p>
    </v-flex>
    <v-flex xs12 v-if="weather && weather.sol_keys">
      <h4>{{ weather.sol_keys.length }} Sols Reporting</h4>
    </v-flex>
    <v-flex xs12cols="12" wrap v-if="weather">
      <v-card v-for="s in weather.sol_keys" v-bind:key="s">
        <v-card-title>Sol {{ s }}</v-card-title>
        <v-card-text>
          <p>Min: {{ weather.sol_weather[s].AT.mn }} &deg; F</p>
          <p>Max: {{ weather.sol_weather[s].AT.mx }} &deg; F</p>
          <p>Avg: {{ weather.sol_weather[s].AT.av }} &deg; F</p>
          <p>Season: {{ weather.sol_weather[s].season }}</p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { getWeather } from '../api/NasaApi'

export default {
  data: () => ({
    weather: null,
    loading: false,
  }),
  created() {
    this.LoadWeather()
  },
  methods: {
    LoadWeather() {
      this.loading = true
      getWeather()
        .then(res => {
          this.weather = res.data
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          this.error = true
        })
    },
  },
}
</script>
