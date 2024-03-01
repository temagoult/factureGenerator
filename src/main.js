import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import "@/assets/index.css"
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
 import "../src/style/style.css"
// name is optional
Vue.use(VueLodash, { name: 'custom' , lodash: lodash })

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
