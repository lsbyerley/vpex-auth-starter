<template>
  <div id="login">
    <section class="section">
      <div class="container container-small align-center">

        <transition name="fade">
          <div v-if="performingRequest" class="progress-bar striped animated loading">
            <span class="progress-bar-green" style="width: 100%;"></span>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="errorMsg !== ''" class="error-msg">
            <p class="alert alert-danger">{{ errorMsg }}</p>
          </div>
        </transition>

        <transition name="fade">
          <div class="panel" v-if="showLoginForm">
            <div class="panel-head">
              <p class="panel-title align-center">Welcome Back</p>
            </div>
            <div class="panel-body">
              <form @submit.prevent class="login-form">
                <div class="form-control">
                  <label for="email1">Email</label>
                  <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />
                </div>
                <div class="form-control">
                  <label for="password1">Password</label>
                  <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />
                </div>
                <button @click="login" class="button-primary">Log In</button>
              </form>
            </div>
            <div class="panel-footer">
              <button class="button-primary-text" @click="togglePasswordReset">Forgot Password</button>
              <button class="button-primary-text" @click="toggleForm">Create an Account</button>
            </div>
          </div>
        </transition>

        <transition name="fade">
          <div class="panel" v-if="!showLoginForm && !showForgotPassword">
            <div class="panel-head">
              <p class="panel-title">Get Started</p>
            </div>
            <div class="panel-body">
              <form @submit.prevent class="signup-form">
                <div class="form-control">
                  <label for="name">Name</label>
                  <input v-model.trim="signupForm.name" type="text" placeholder="name" id="name" />
                </div>
                <div class="form-control">
                  <label for="username">Username</label>
                  <input v-model.trim="signupForm.username" type="text" placeholder="username" id="username" />
                </div>
                <div class="form-control">
                  <label for="email2">Email</label>
                  <input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />
                </div>
                <div class="form-control">
                  <label for="password2">Password</label>
                  <input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" />
                </div>
                <button @click="signup" class="button-primary">Sign Up</button>
              </form>
            </div>
            <div class="panel-footer">
              <button @click="toggleForm" class="button-primary-text">Back to Log In</button>
            </div>
          </div>
        </transition>

        <transition name="fade">
          <div class="panel" v-if="showForgotPassword">
            <div class="panel-head">
              <p class="panel-title" v-if="!passwordResetSuccess">Reset Password</p>
              <p class="panel-title" v-else>Email Sent</p>
            </div>
            <div class="panel-body">
              <form @submit.prevent class="password-reset-form">
                <div v-if="!passwordResetSuccess">
                  <p>We will send you an email to reset your password</p>
                  <div class="form-control">
                    <label for="email3">Email</label>
                    <input v-model.trim="passwordForm.email" type="text" placeholder="you@email.com" id="email3" />
                  </div>
                  <button @click="resetPassword" class="button-primary">Submit</button>
                </div>
                <div v-else>
                  <p>check your email for a link to reset your password</p>
                </div>
              </form>
            </div>
            <div class="panel-footer">
              <button @click="togglePasswordReset" class="button-primary-text">Back to login</button>
            </div>
          </div>
        </transition>

      </div>
    </section>
  </div>
</template>

<script>
const fb = require('../firebaseConfig.js')

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        username: '',
        email: '',
        password: ''
      },
      passwordForm: {
        email: ''
      },
      showLoginForm: true,
      showForgotPassword: false,
      passwordResetSuccess: false,
      performingRequest: false,
      errorMsg: ''
    }
  },
  methods: {
    toggleForm() {
      this.errorMsg = ''
      this.showLoginForm = !this.showLoginForm
    },
    togglePasswordReset() {
      if (this.showForgotPassword) {
        this.errorMsg = ''
        this.showLoginForm = true
        this.showForgotPassword = false
        this.passwordResetSuccess = false
      } else {
        this.errorMsg = ''
        this.showLoginForm = false
        this.showForgotPassword = true
      }
    },
    async login() {
      this.performingRequest = true

      try {
        const loginRequest = await fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password);
        this.performingRequest = false
        this.errorMsg = ''
        this.$router.push('/dashboard')

      } catch(err) {
        console.log('login error!', err)
        this.performingRequest = false
        this.handleErrorCode(err.code)
      }

    },
    async signup() {
      this.performingRequest = true
      //TODO: email,password,name,username sanitation

      try {
        const createReq = await fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password);
        const userDocReq = await fb.usersCollection.doc(createReq.user.uid).set({
          name: this.signupForm.name,
          username: this.signupForm.username
        })
        this.performingRequest = false
        this.errorMsg = ''
        this.$router.push('/dashboard')

      } catch(err) {
        console.log('sign up error', err)
        this.performingRequest = false
        this.handleErrorCode(err.code)
      }

    },
    async resetPassword() {
      this.performingRequest = true

      try {
        const resetReq = await fb.auth.sendPasswordResetEmail(this.passwordForm.email);
        this.performingRequest = false
        this.passwordResetSuccess = true
        this.passwordForm.email = ''
        this.errorMsg = ''

      } catch(err) {
        console.log('password reset error!',err)
        this.performingRequest = false
        this.handleErrorCode(err.code)
      }

    },
    handleErrorCode(code) {
      //https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html
      let message = '';
      switch(code) {
        case 'auth/invalid-email':
          message = 'The email is invalid. Please try again.';
          break;
        case 'auth/user-not-found':
          message = 'An account associated with this email was not found.';
          break;
        case 'auth/user-disabled':
          message = 'The account associated with this email has been disabled.';
          break;
        case 'auth/wrong-password':
          message = 'The password entered is incorrect.';
          break;
        case 'auth/weak-password':
          message = 'The password entered is too weak. Please try a stronger one.';
          break;
        case 'auth/email-already-in-use':
          message = 'This email is already associated with another account.';
          break;
        default:
          message = 'Ooops, there was an error. Please try again or contact support';
      }
      this.errorMsg = message;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
