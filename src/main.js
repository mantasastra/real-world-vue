import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import DateFilter from './filters/date'

import 'nprogress/nprogress.css'

Vue.config.productionTip = false

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})

Vue.use(Vuelidate)
Vue.filter('date', DateFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
