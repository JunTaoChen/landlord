import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview';
import './assets/iview.less';
import util from '@/util';
const confirm = iView.Modal.confirm
iView.Modal.confirm = (prop)=>{
  if(!prop["title"]){
    prop.title = "提示";
  }
  confirm(prop)
}
Vue.config.productionTip = false
Vue.use(iView);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(() => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});
Vue.filter('formatTime',util.formatTime);
Vue.filter('phoneFormat',util.phoneFormat);
Vue.filter('idFormat',util.idFormat);

const v = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

util.init(v);