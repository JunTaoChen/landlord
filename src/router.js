import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const routes  =  [
  {
    path: '/',
    component: (resolve) => require(['./layout/baseLayout.vue'], resolve),
    redirect: "account",
    children: [
      { path: 'index',  name: 'index', component: resolve => { require(['./views/index.vue'], resolve); } },
      { path: 'account',  name: 'account', component: resolve => { require(['./views/account.vue'], resolve); } },
      { path: 'houseman',  name: 'houseman', component: resolve => { require(['./views/houseman.vue'], resolve); } },
      { path: 'tenant',  name: 'tenant', component: resolve => { require(['./views/tenant.vue'], resolve); } },
      { path: 'building',  name: 'building', component: resolve => { require(['./views/building.vue'], resolve); } },
      { path: 'bill',  name: 'bill', component: resolve => { require(['./views/bill.vue'], resolve); } },
    ],
  },
  
  {
    path: '/login',
    name: 'login',
    component: (resolve) => require(['./views/user/login.vue'], resolve)
  },
  {
    path:"*",
    component: (resolve) => require(['./views/404.vue'], resolve)
  }
];
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  base: process.env.BASE_URL,
  routes
})
