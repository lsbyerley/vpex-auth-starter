<template>
  <div id="profile">
    <section class="section">
      <div class="container container-small align-center">
        <h1>Profile</h1>
        
        <transition name="fade">
          <div v-if="showSuccess" class="success-msg">
            <p class="alert alert-success">Profile Updated!</p>
          </div>
        </transition>

        <div class="panel">
          <div class="panel-head">
            <p class="panel-title">Update Profile</p>
          </div>
          <div class="panel-body">
            <form @submit.prevent class="update-profile-form">
              <div class="form-control">
                <label for="name">Name</label>
                <input v-model.trim="name" type="text" :placeholder="userProfile.name" id="name" />
              </div>
              <div class="form-control">
                <label for="username">Username</label>
                <input v-model.trim="username" type="text" :placeholder="userProfile.username" id="username" />
              </div>
            </form>
          </div>
          <div class="panel-footer">
            <button @click="updateProfile" class="button-primary" :disabled="updateDisabled">Update Profile</button>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  data() {
    return {
      name: '',
      username: '',
      showSuccess: false
    }
  },
  computed: {
    ...mapState(['userProfile']),
    updateDisabled() {
      let nameValid = (this.name !== '' && this.name !== this.userProfile.name)
      let usernameValid = (this.username !== '' && this.username !== this.userProfile.username)
      if (nameValid || usernameValid) {
        return false
      }
      return true
    }
  },
  methods: {
    updateProfile() {
      //TODO: name, username sanitation
      if (!this.updateDisabled) {
        this.$store.dispatch('updateProfile', {
          name: this.name !== '' ? this.name : this.userProfile.name,
          username: this.username !== '' ? this.username : this.userProfile.username
        })
        this.name = ''
        this.username = ''
        this.showSuccess = true
        setTimeout(() => { this.showSuccess = false }, 2000)
      }
    }
  }
}
</script>

<style lang="scss">

</style>
