import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const routes  =  [
  {
    path: '/',
    component: (resolve) => require(['./layout/baseLayout.vue'], resolve),
    redirect: "building",
    children: [
      { path: 'index',  name: 'index', component: resolve => { require(['./views/index.vue'], resolve); } },
      { path: 'landlord',  name: 'landlord', component: resolve => { require(['./views/account/landlord.vue'], resolve); } },
      { path: 'rooms',  name: 'rooms', component: resolve => { require(['./views/rooms.vue'], resolve); } },
      { path: 'houseman',  name: 'houseman', component: resolve => { require(['./views/account/houseman.vue'], resolve); } },
      { path: 'tenant',  name: 'tenant', component: resolve => { require(['./views/account/tenant.vue'], resolve); } },
      { path: 'building',  name: 'building', component: resolve => { require(['./views/building.vue'], resolve); } },
      { path: 'add_bill',  name: 'addBill', component: resolve => { require(['./views/bill/add.vue'], resolve); } },
      { path: 'bill_list',  name: 'billList', component: resolve => { require(['./views/bill/list.vue'], resolve); } },
      { path: 'contract_add',  name: 'contractAdd', component: resolve => { require(['./views/contract/add.vue'], resolve); } },
      { path: 'contract_update',  name: 'contractUpdate', component: resolve => { require(['./views/contract/update.vue'], resolve); } },
      { path: 'contract_print',  name: 'contractPrint', component: resolve => { require(['./views/contract/print.vue'], resolve); } },
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
