<template>
  <div>
    <h1>404</h1>
    <p>Page not found</p>
  </div>
</template>

<script lang="babel" type="text/babel">
export default {
  created() {
    SSR.error()
  },
}
</script>

<style lang="sass" type="text/sass"></style>