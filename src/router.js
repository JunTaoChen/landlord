import Vue from 'vue'
import Router from 'vue-router'
import cAdd from './views/contract/add.vue'

const cUpdate = { extends: cAdd }
const cPrint = { extends: cAdd }

Vue.use(Router)
export const routes = [
  {
    path: '/',
    component: (resolve) => require(['./layout/baseLayout.vue'], resolve),
    redirect: "login",
    children: [
      { path: 'index', name: 'index', component: resolve => { require(['./views/index.vue'], resolve); } },
      { path: 'landlord', name: 'landlord',meta:{parent:"account"}, component: resolve => { require(['./views/account/landlord.vue'], resolve); } },
      { path: 'rooms', name: 'rooms', component: resolve => { require(['./views/rooms.vue'], resolve); } },
      { path: 'houseman', name: 'houseman',meta:{parent:"account"}, component: resolve => { require(['./views/account/houseman.vue'], resolve); } },
      { path: 'tenant', name: 'tenant',meta:{parent:"account"}, component: resolve => { require(['./views/account/tenant.vue'], resolve); } },
      { path: 'building', name: 'building', component: resolve => { require(['./views/building.vue'], resolve); } },
      { path: 'add_bill', name: 'addBill',meta:{parent:"bill"}, component: resolve => { require(['./views/bill/add.vue'], resolve); } },
      { path: 'bill_list', name: 'billList',meta:{parent:"bill"}, component: resolve => { require(['./views/bill/list.vue'], resolve); } },
      { path: 'contract_add', name: 'contractAdd',meta:{parent:"contract"}, component: cAdd },
      { path: 'contract_update', name: 'contractUpdate',meta:{parent:"contract"}, component: cUpdate },
      { path: 'contract_print', name: 'contractPrint',meta:{parent:"contract"}, component: cPrint },
      { path: 'bill', name: 'bill',meta:{parent:"bill"}, component: resolve => { require(['./views/bill/bill.vue'], resolve);}},
    ],
  },
  { path: '/contract/print/:id', name: 'cPrint', component: resolve => { require(['./views/contract/print.vue'], resolve); } },
  {
    path: '/login',
    name: 'login',
    component: (resolve) => require(['./views/user/login.vue'], resolve)
  },
  {
    path: "*",
    component: (resolve) => require(['./views/404.vue'], resolve)
  }
];
export default new Router({
  base: process.env.BASE_URL,
  routes
})
