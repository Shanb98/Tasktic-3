<template>
    <v-app id="inspire">
      <!-- Navigation Drawer -->
      <v-navigation-drawer v-model="drawer" app>
        <v-list>
          <v-list-item-group>
            <v-list-item @click="selectMenu('home')">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
            <v-list-item @click="selectMenu('project')">
              <v-list-item-icon>
                <v-icon>folder_open</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Projects</v-list-item-title>
            </v-list-item>
            <v-list-item @click="selectMenu('asignee')">
              <v-list-item-icon>
                <v-icon>perm_identity</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Asignees</v-list-item-title>
            </v-list-item>
            <v-list-item @click="selectMenu('about')">
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
  import Project from "@/components/ProjectPage.vue"; 
  import Asignee from "@/components/AsigneePage.vue"; 
  export default {
    name: "DashboardPage",
    components: {
      Home,
      About,
      Project,
      Asignee
    },
    data: () => ({
      drawer: null, // State for the navigation drawer
      selectedMenu: "home", // Default menu selection
    }),
    computed: {
      // Compute the current component based on the selected menu
      currentComponent() {
        if(this.selectedMenu == "about"){
          return About
        }else if(this.selectedMenu == "project"){
          return Project
        }else if(this.selectedMenu == "asignee"){
          return Asignee
        }else{
          return Home
        }
      },
    },
    methods: {
      // Method to update the selected menu
      selectMenu(menu) {
        this.selectedMenu = menu;
      },
    },
  };
  </script>
  
  
  <style scoped>
  /* Add any custom styles if needed */
  </style>
  