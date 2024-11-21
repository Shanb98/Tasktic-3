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
        <!-- Conditional rendering of selected menu content -->
        <component :is="currentComponent" />
      </v-container>
    </v-main>
    </v-app>
  </template>
  
  <script>
  import Home from "@/components/frontPage.vue"; // Import the Home component
  import About from "@/components/AboutPage.vue"; // Import the About component
  
  export default {
    name: "DashboardPage",
    components: {
      Home,
      About,
    },
    data: () => ({
      drawer: null, // State for the navigation drawer
      selectedMenu: "home", // Default menu selection
    }),
    computed: {
      // Compute the current component based on the selected menu
      currentComponent() {
        if (this.selectedMenu === "home") return "Home";
        if (this.selectedMenu === "about") return "About";
        return "Home"; // Default fallback
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom styles if needed */
  </style>
  