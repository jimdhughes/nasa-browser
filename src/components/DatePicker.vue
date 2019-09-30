<template>
  <v-row>
    <v-btn icon v-on:click="decrementDate">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
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
          v-model="newDate"
          label="Pick a date"
          prepend-icon="mdi-calendar"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="newDate" @input="menu = false" :max="maxDate"></v-date-picker>
    </v-menu>
    <v-btn icon v-on:click="incrementDate" :disabled="isMaxDate()">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-row>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      default: () => new Date(),
    },
    onChange: {
      type: Function,
    },
    maxDate: {
      type: String,
      default: () => new Date().toISOString().substr(0, 10),
    },
  },
  data: () => ({
    menu: false,
    newDate: null,
  }),
  mounted() {
    this.newDate = new Date(this.date).toISOString().substr(0, 10)
  },
  methods: {
    incrementDate() {
      this.newDate = new Date(this.date)
      this.newDate.setDate(this.newDate.getDate() + 1)
      this.newDate = this.newDate.toISOString().substr(0, 10)
      this.onChange(this.newDate)
    },
    decrementDate() {
      this.newDate = new Date(this.date)
      this.newDate.setDate(this.newDate.getDate() - 1)
      this.newDate = this.newDate.toISOString().substr(0, 10)
      this.onChange(this.newDate)
    },
    isMaxDate() {
      const curDate = new Date(this.date)
      return curDate >= new Date(this.maxDate)
    },
  },
  watch: {
    newDate: {
      handler(newDate) {
        this.onChange(newDate)
      },
    },
  },
}
</script>