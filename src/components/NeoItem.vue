<template>
  <v-container justify="start">
    <v-card justify="start" align="start">
      <v-card-title>{{ neo.name }}</v-card-title>
      <v-card-text>
        <v-layout column>
          <span>Magnitude: {{ neo.absolute_magnitude_h }}</span>
          <span
            >Potentially Hazerdous: {{ neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No' }}</span
          >
          <span>Diameter: {{ neo.estimated_diameter.kilometers.estimated_diameter_max }} km</span>
          <span>
            Velocity:
            {{ neo.close_approach_data[0].relative_velocity.kilometers_per_hour }} km/h
          </span>
          <span
            >Miss Distance: {{ neo.close_approach_data[0].miss_distance.lunar }} lunar units</span
          >
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="blue" @click="goToJpl">JPL</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    neo: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    goToJpl() {
      window.open(this.neo.nasa_jpl_url, '_blank')
    },
  },
}
</script>
