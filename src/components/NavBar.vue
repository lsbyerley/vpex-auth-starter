<template>
  <nav class="nav">
    <div class="nav-container">
      <div class="nav-logo">
        <router-link to="dashboard">VPEX Auth</router-link>
      </div>
      <ul class="nav-links" v-if="currentUser">
        <li><router-link active-class="active" to="profile">Profile</router-link></li>
        <li><a href="#" @click="logout">Logout</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js');

export default {
  name: 'NavBar',
  computed: {
    ...mapState(['userProfile', 'currentUser'])
  },
  methods: {
    async logout() {

      try {
        const logoutReq = await fb.auth.signOut();
        this.$store.dispatch('clearData')
        this.$router.push('/login')
      } catch(err) {
        console.log('logout error!', err)
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  box-shadow: 0 2px 10px rgba(0,0,0,.43);
}
</style>
