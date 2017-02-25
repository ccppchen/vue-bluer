// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Components from './components/components'

import "sass/comm.scss"

// 公共组件 引入
import components from './components'
// 公共组件 调用
Object.keys(components).forEach((key) => {
  let name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
  Vue.component(`Bl${name}`, components[key])
})

// components
import Toast from './components/toast'
import Modal from './components/modal'

Vue.$toast = Vue.prototype.$toast = Toast;
Vue.$modal = Vue.prototype.$modal = Modal;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<components/>',
  components: { Components }
})

