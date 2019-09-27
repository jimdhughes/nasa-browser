<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item to="/apod">
          <v-list-item-action>
            <v-icon>mdi-camera-image</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>APOD</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/neosearch">
          <v-list-item-action>
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>NEO Search</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/weather">
          <v-list-item-action>
            <v-icon>mdi-weather-sunny</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Mars Weather</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>NASA Browser</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex>
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
  }),
  created() {
    this.$vuetify.theme.dark = true
  },
}
</script>
