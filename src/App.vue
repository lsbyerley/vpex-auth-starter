<template>
  <div id="app-wrap">
    <NavBar></NavBar>
    <main>
      <router-view/>
    </main>
    <FootBar><FootBar/>
  </div>
</template>

<script>
import NavBar from '~/src/components/NavBar'
import FootBar from '~/src/components/FootBar'

export default {
  name: 'App',
  components: {
    NavBar,
    FootBar
  }
};
</script>

<style lang="scss">
@import './assets/styles/app.scss';
</style>
