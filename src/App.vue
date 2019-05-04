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

export default {
  name: 'App',
  components: {
    NavBar
  }
};
</script>

<style lang="scss">
@import './assets/styles/app.scss';
</style>
