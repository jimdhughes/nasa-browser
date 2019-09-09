<template>
  <v-container>
    <v-layout column>
      <v-flex xs12 mb-5>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Pick a date"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="menu = false" :max="date"></v-date-picker>
        </v-menu>
      </v-flex>
      <v-row v-if="loading" justify="center">
        <v-progress-circular size="32" width="4" :indeterminate="true" color="light-blue"></v-progress-circular>
      </v-row>
      <v-row v-if="error" justify="center">Error Getting APOD</v-row>
      <v-col cols="12" justify="center" v-if="apod">
        <v-row v-if="apod.media_type=='image'" align="center" justify="center">
          <v-img
            v-bind:src="apod.url"
            v-bind:lazy-src="apod.url"
            aspect-ratio="1"
            class="grey lighten-2"
            max-width="500"
            max-height="300"
          ></v-img>
        </v-row>
        <v-row align="center" justify="center">
          <p>{{apod.title}}</p>
        </v-row>
        <v-row align="center" justify="center" v-if="apod.copyright">&copy; {{apod.copyright}}</v-row>
        <v-row v-if="apod" align="center" justify="center">
          <a v-bind:href="apod.url" target="_blank">
            <span v-if="apod.media_type=='image'">SD</span>
            <span v-if="apod.media_type=='video'">Watch Here</span>
          </a>
          <span v-if="apod.hdurl">
            &nbsp;|
            <a v-bind:href="apod.hdurl" v-if="apod.hdurl" target="_blank">HD</a>
          </span>
        </v-row>
      </v-col>
    </v-layout>
  </v-container>
</template>
<script>
import { getApod } from '../api/NasaApi'

export default {
  data: () => ({
    menu: false,
    date: new Date().toISOString().substr(0, 10),
    apod: null,
    loading: false,
    error: false,
  }),
  created() {
    this.requestApod()
  },
  methods: {
    requestApod() {
      this.apod = null
      this.loading = true
      this.error = false
      getApod(this.date)
        .then(res => {
          this.apod = res.data
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          this.error = true
        })
    },
  },
  watch: {
    date: {
      handler(date) {
        this.requestApod()
      },
    },
  },
}
</script>
