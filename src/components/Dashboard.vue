<template>
  <div id="dashboard">
    <section class="section">
      <div class="container container-small align-center">
        <h1>Dashboard</h1>
        <h2>Hello, {{ userProfile.username }}</h2>
        <p>ApiTest: {{ apiTest }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
const apiHost = process.env.API_HOST || ''

export default {
  name: 'Dashboard',
  data() {
    return {
      apiTest: ''
    }
  },
  computed: {
    ...mapState(['userProfile', 'currentUser'])
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        const res = await axios.get(`${apiHost}/api/test`)
        this.apiTest = res.data.message
      } catch(e) {
        console.log('Error in the api')
        this.apiTest = 'api is broke!'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
