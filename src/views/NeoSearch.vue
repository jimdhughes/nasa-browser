<template>
  <v-container>
    <v-layout column>
      <DateSelector :date="date" :onChange="onDateSelect" />
      <v-col v-if="neos && neos.length > 0">
        <NeoList :neos="neos" :date="date" />
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
import { getNeos } from '../api/NasaApi'
import DateSelector from '../components/DatePicker.vue'
import NeoList from '../components/NeoList.vue'

export default {
  components: {
    NeoList,
    DateSelector,
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
    onDateSelect(d) {
      this.date = d
    },
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
          this.neos = res.data.sort(x =>
            x.is_potentially_hazardous_asteroid ? -1 : 1
          )
        })
      },
    },
  },
}
</script>
