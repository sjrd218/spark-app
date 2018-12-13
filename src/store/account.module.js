import {
  SparkService
} from "@/utilities/LoginServices";

import {
  router
} from '@/router';

const state = {
  status: {
    loggedIn: false
  },
  user: null
};

const getters = {
  username: state => state.username,
  getUser: state => state.user,
  getStatus: state => state.status
}

const actions = {
  setUser({
    commit
  }, {
    payload
  }) {
    return new Promise(resolve => {
      console.log('calling set user', payload)
      commit('LOGIN_SUCCESS', payload)
      resolve() // executor
    });

  },
  login({
    dispatch,
    commit
  }, {
    username,
    password
  }) {
    commit('LOGIN_REQUEST', {
      username
    });
    SparkService.login(username, password).then(user => {
      commit('LOGIN_SUCCESS', user)
      router.push('/');
    }, error => {
      console.log('error!', error)
      commit('LOGIN_FAILURE', error);
      // dispatch('alert/error', error, {
      //   root: true
      // });
    })
  },
  logout({
    commit
  }) {
    SparkService.logout().then(() => {
      commit('LOGOUT')
    })


  },
  checkUser({
    commit
  }) {
    checkUser().then(user => {
      commit('LOGIN_SUCCESS', user)
    }, error => {
      console.log('error', error)
    })
  },
  register({
    dispatch,
    commit
  }, {
    username,
    password,
    email
  }) {
    commit('REGISTER_REQUEST');
    SparkService.register(username, password, email).then(() => {
      commit('REGISTER_SUCCESS', username);
      router.push({
        path: '/registration-verification',
        query: {
          username: username
        }
      });
      // setTimeout(() => {
      // display success message after route change completes
      // dispatch('alert/success', 'Registration successful', {
      //   root: true
      // });
      // })
    }, error => {
      console.error('registration error', error)
      commit('REGISTER_FAILURE')
    })
  },
  verify({
    dispatch,
    commit
  }, {
    username,
    verificationCode
  }) {
    commit('VERIFY_REQUEST');
    SparkService.verify(username, verificationCode).then(() => {
      commit('VERIFY_SUCCESS');
      router.push('/login');
      // setTimeout(() => {
      // display success message after route change completes
      // dispatch('alert/success', 'Registration successful', {
      //   root: true
      // });
      // })
    }, error => {
      commit('VERIFY_FAILURE');
      console.error('VERIFY_FAILURE', error)
    })
  }
};

const mutations = {
  LOGIN_REQUEST(state, user) {
    state.status = {
      loggingIn: true
    };
    state.user = user;
  },
  LOGIN_SUCCESS(state, user) {
    console.log('LOGIN_SUCCESS')
    state.status = {
      loggedIn: true
    };
    state.user = user;
  },
  LOGIN_FAILURE(state) {
    state.status = {};
    state.user = null;
  },
  LOGOUT(state) {
    state.status = {};
    state.user = null;
  },
  REGISTER_REQUEST(state, user) {
    state.status = {
      registering: true
    };
  },
  REGISTER_SUCCESS(state, username) {
    state.status = {};
    state.username = username
  },
  REGISTER_FAILURE(state, error) {
    state.status = {};
  },
  VERIFY_REQUEST(state) {
    state.status = {
      verifying: true
    };
  },
  VERIFY_SUCCESS(state) {
    state.status = {};
  },
  VERIFY_FAILURE(state, error) {
    state.status = {};
  }
};

export const account = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

export const checkUser = () => {
  console.log('check user is fireing')
  return new Promise((resolve, reject) => {
    SparkService.fireSetCurrentUserEvent().then(user => {
      resolve(user)
    }, error => {
      console.log('error', error)
      reject(error)
    })
  });
}
