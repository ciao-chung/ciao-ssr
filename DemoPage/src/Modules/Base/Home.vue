<template>
  <div page="home">
    <img src="static/logo.png">
    <h1>home</h1>
    <p class="home">home</p>

    <div v-if="data">
      <h3>This is async content...</h3>
      <p>{{data}}</p>
    </div>
  </div>
</template>

<script lang="babel" type="text/babel">
export default {
  data() {
    return {
      data: null,
    }
  },
  async created() {
    this.$store.dispatch('Base/loading')
    this.data = await this.foo()
    this.$store.dispatch('Base/loading', false)
    SSR.done()
  },
  methods: {
    async wait(ms) {
      return new Promise(resolve => {
        setTimeout(() => resolve() , ms)
      })
    },
    async foo() {
      await this.wait(2000)
      return { foo: 'bar' }
    },
  },
  computed: {
    loading: function () {
      return this.$store.getters['Base/loading']
    },
  },
}
</script>

<style lang="sass" type="text/sass">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px
div[page="home"]
  transition: all 0.5s ease
  img
    width: 120px
  p
    color: gray
</style>