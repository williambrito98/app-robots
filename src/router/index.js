import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Config from '../views/Config.vue'
import ConfigRobot from '../views/ConfigRobot.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/config',
    name: 'Config',
    component: Config
  },
  {
    path: '/configRobot/:robot',
    name: 'ConfigRobot',
    component: ConfigRobot
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
