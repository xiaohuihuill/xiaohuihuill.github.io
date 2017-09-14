import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Advert from '@/components/Advert'
import Facility from '@/components/Facility'
import Statement from '@/components/Statement'
import Password from '@/components/Password'
import Activity from '@/components/Activity'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path:'/advert',
      component:Advert
    },
    {
      path:'/facility',
      component:Facility
    },
    {
      path:'/statement',
      component:Statement
    },
    {
      path:'/password',
      component:Password
    },
    {
      path:'/activity',
      component:Activity
    },

  ]
})
