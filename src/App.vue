<template>
  <div id="app-wrap">
    <NavBar></NavBar>
    <main>
      <router-view/>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import NavBar from '~/src/components/NavBar'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    NavBar
  },
  computed: {
    ...mapState(['currentUser'])
  }
};
</script>

<style lang="scss">
@import './assets/styles/app.scss';
</style>
