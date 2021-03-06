import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  store
} from '@/store'
import {
  checkUser
} from '@/store/account.module'

import Home from '@/views/Home'
import Test from '@/views/TestPage'
import LoginForm from '@/views/LoginForm'
import MySpark from '@/views/MySpark'
import Register from '@/views/Register'
import Forgot from '@/views/Forgot'
import ResetPassword from '@/views/ResetPassword'
import RegistrationVerification from '@/views/RegistrationVerification'
import Profile from '@/views/Profile'
import ChangePassword from '@/views/ChangePassword'
import ChangeAccountInfo from '@/views/ChangeAccountInfo'

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginForm
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/forgot',
      name: 'Forgot',
      component: Forgot
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/registration-verification',
      name: 'RegistrationVerification',
      component: RegistrationVerification
    },
    {
      path: '/myspark',
      name: 'MySpark',
      component: MySpark
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/profile/change-password',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path: '/profile/change-account-info',
      name: 'ChangeAccountInfo',
      component: ChangeAccountInfo
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = [
    '/',
    '/login',
    '/register',
    '/registration-verification',
    '/forgot',
    '/reset-password'
  ]
  const authRequired = !publicPages.includes(to.path)
  const status = store.getters['account/getStatus']

  if (authRequired && !status.loggedIn) {
    checkUser().then(
      results => {
        store.dispatch('account/setUser', results)
        return next(to.path)
      },
      () => {
        return next('/')
      }
    )
  }

  next()
})
