import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('../firebaseConfig.js')

Vue.use(Vuex)

// handle page reload
fb.auth.onAuthStateChanged(user => {
  if (user) {

    store.commit('setCurrentUser', user)

    fb.usersCollection.doc(user.uid).onSnapshot((doc) => {
      store.commit('setUserProfile', doc.data())
    })

  }
})

const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {}
  },
  actions: {
    clearData({ commit }) {
      commit('setCurrentUser', null)
      commit('setUserProfile', {})
    },
    async fetchUserProfile({ commit, state }) {

      try {
        const fetchReq = await fb.usersCollection.doc(state.currentUser.uid).get()
        commit('setUserProfile', fetchReq.data())
      } catch(err) {
        console.log('error setting profile!', err)
      }

    },
    async updateProfile({ commit, state }, data) {
      let name = data.name
      let username = data.username

      try {
        const updateReq = await fb.usersCollection.doc(state.currentUser.uid).update({ name, username });
      } catch(err) {
        console.log('error updating profile!', err)
      }

    }
  },
  mutations: {
    setCurrentUser(state, val) {
      Vue.set(state, 'currentUser', val);
    },
    setUserProfile(state, val) {
      Vue.set(state, 'userProfile', val)
    }
  }
})

export default store;