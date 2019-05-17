// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import map from './components/common/map'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import '../src/assets/css/style.css'
import * as esriLoader from 'esri-loader'
import {post, get, patch} from './data/request/request'
import store from '../src/data/store/store'
import Axios from 'axios'
import { Loading } from 'element-ui'
import router from './router'

// import Configs from './config'
Vue.prototype.$get = get
Vue.prototype.$patch = patch
Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Vue.prototype.myMap = map
Vue.prototype.Loading = Loading

Vue.use(ElementUI)
Vue.use(esriLoader)

// 定义全局变量
Vue.prototype.$post = post

// 初始化指令---点击空白处时触发的时间
Vue.directive('clickoutside',{
  bind(el, binding, vnode) {
    function documentHandler(e) {
      if (el.contains(e.target)) { // 这里判断点击的元素是否是本身，是本身，则返回
        return false;
      }
      if (binding.expression) { // 判断指令中是否绑定了函数
        binding.value(e);// 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
      }
    }
    el.__vueClickOutside__ = documentHandler; // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    document.addEventListener('click', documentHandler);
  },
  unbind(el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__); // 解除事件监听
    delete el.__vueClickOutside__;
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // Configs,
  components: { App },
  template: '<App/>'
})
