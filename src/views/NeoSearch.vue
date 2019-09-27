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
          <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex v-if="neos && neos.length > 0">
        <NeoList :neos="neos" :date="date" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getNeos } from '../api/NasaApi'
import NeoList from '../components/NeoList.vue'

export default {
  components: {
    NeoList,
  },
  data: () => ({
    menu: false,
    date: new Date().toISOString().substr(0, 10),
    neos: [],
  }),
  created() {
    getNeos(this.date).then(res => {
      this.neos = res.data
    })
  },
  methods: {
    onDateSelect() {},
    loadNeos(date) {
      getNeos(date).then(res => {
        this.neos = res.data
        this.neos = this.neos.sort((a, b) => {
          a.is_potentially_hazardous_asteroid ? 1 : -1
        })
      })
    },
  },
  watch: {
    date: {
      handler(date) {
        getNeos(date).then(res => {
          this.neos = res.data
        })
      },
    },
  },
}
</script>
