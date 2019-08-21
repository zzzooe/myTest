import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

//修改vue的原型(总线模式)
Vue.prototype.$bus = new Vue();
//他是一个新的vue实例,与下面这个vue实例无关(或者说将来会是下面vue的孩子)
// 通过vue实例可以找到$bus

new Vue({
  render: h => h(App)
}).$mount("#app");
// 创建一个vue实例,render渲染出来,挂在html里id为app的元素身上
