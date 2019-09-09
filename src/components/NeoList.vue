<template>
  <v-layout column text-center>
    <p>There are {{ neos.length + 1 }} NEO's on {{ date }}</p>
    <NeoItem v-for="n in neos" :neo="n" v-bind:key="n.id" />
  </v-layout>
</template>
<script>
import NeoItem from './NeoItem.vue'

export default {
  components: {
    NeoItem,
  },
  props: {
    neos: {
      type: Array,
    },
    date: {
      type: String,
    },
  },
}
</script>
