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
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    menu: false,
    date: new Date().toISOString().substr(0, 10),
  }),
}
</script>
