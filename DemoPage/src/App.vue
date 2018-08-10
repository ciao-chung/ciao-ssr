<template>
  <div id="app">
    <router-view/>

    <transition name="transition-loading">
      <AppLoading v-if="loading"/>
    </transition>
  </div>
</template>

<script lang="babel" type="text/babel">
import bootstrap from 'bootstrap/dist/js/bootstrap.js'
import AppLoading from 'Components/Loading/DoubleBounce.vue'
export default {
  name: 'App',
  computed: {
    loading: function () {
      return this.$store.getters['Base/loading']
    },
  },
  components: {
    AppLoading,
  },
}
</script>

<style src="bootstrap/dist/css/bootstrap.min.css"></style>
<style src="font-awesome/css/font-awesome.min.css"></style>
<style lang="sass" type="text/sass">
.transition-loading
  &-enter-active, &-leave-active
    transition: all 0.5s ease
  &-enter, &-leave-active
    opacity: 0
</style>