<template>
  <v-container>
    <v-layout column>
      <DatePicker :date="date" :onChange="onDateChange"></DatePicker>
      <v-row v-if="loading" justify="center">
        <v-progress-circular size="32" width="4" :indeterminate="true" color="light-blue"></v-progress-circular>
      </v-row>
      <v-row v-if="error" justify="center">Error Getting APOD</v-row>
      <v-col cols="12" justify="center" v-if="apod">
        <v-row v-if="apod.media_type == 'image'" align="center" justify="center">
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
          <p>{{ apod.title }}</p>
        </v-row>
        <v-row align="center" justify="center" v-if="apod.copyright">&copy; {{ apod.copyright }}</v-row>
        <v-row v-if="apod" align="center" justify="center">
          <a v-bind:href="apod.url" target="_blank">
            <span v-if="apod.media_type == 'image'">SD</span>
            <span v-if="apod.media_type == 'video'">Watch Here</span>
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
import DatePicker from '../components/DatePicker.vue'
export default {
  components: {
    DatePicker,
  },
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
        .catch(() => {
          this.loading = false
          this.error = true
        })
    },
    onDateChange(d) {
      this.date = d
    },
  },
  watch: {
    date: {
      handler() {
        this.requestApod()
      },
    },
  },
}
</script>
