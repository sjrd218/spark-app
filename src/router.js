import Router from 'vue-router'

import Home from '@/views/Home'
import LoginForm from '@/views/LoginForm';
import MySpark from '@/views/MySpark';
import SignUpForm from '@/views/SignUpForm';
import Profile from '@/views/Profile';

// Components

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginForm
    },
    {
      path: '/register',
      name: 'Register',
      component: SignUpForm
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
    }
  ]
})
