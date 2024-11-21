import Vue from "vue";
import VueRouter from "vue-router";
import DashboardPage from "../views/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
    {
      name: "DashboardPage", // Update the route name
      component: DashboardPage,
      path: "/",
    },
  ];

const router = new VueRouter({
  mode: "history", // Use history mode for clean URLs
  routes,          // Pass the routes array here
});

export default router;
