import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/index'

import "vuetify/dist/vuetify.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
Vue.config.productionTip = false

new Vue({
  vuetify,
  router, // Add the router here
  render: h => h(App),
}).$mount('#app');
