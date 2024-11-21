<template>
    <v-app id="inspire">
      <!-- Navigation Drawer -->
      <v-navigation-drawer
        v-model="drawer"
        app
      >
        <v-list>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
  
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-information</v-icon>
              </v-list-item-icon>
              <v-list-item-title>About</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
  
      <!-- Application Bar -->
      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Dashboard</v-toolbar-title>
      </v-app-bar>
  
      <!-- Main Content -->
      <v-main>
        <v-container>
          <h1>Welcome to the Dashboard</h1>
          <p>This is the main content area of the dashboard.</p>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    name: "DashboardPage",
    data: () => ({
      drawer: null, // State for the navigation drawer
    }),
  };
  </script>
  
  <style scoped>
  /* Add any custom styles if needed */
  </style>
  