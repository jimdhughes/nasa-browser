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
          v-model="date"
          label="Pick a date"
          prepend-icon="mdi-calendar"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" @input="menu = false" :max="maxDate"></v-date-picker>
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
  }),
  methods: {
    incrementDate() {
      const curDate = new Date(this.date)
      curDate.setDate(curDate.getDate() + 1)
      this.onChange(curDate.toISOString().substr(0, 10))
    },
    decrementDate() {
      const curDate = new Date(this.date)
      curDate.setDate(curDate.getDate() - 1)
      this.onChange(curDate.toISOString().substr(0, 10))
    },
    isMaxDate() {
      const curDate = new Date(this.date)
      return curDate >= new Date(this.maxDate)
    },
  },
}
</script>