<template>
  <div class="loading-container">
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
  </div>
</template>

<style lang="sass" type="text/sass" scoped>
@import '~assets/sass/variable'
.loading-container
  z-index: $loading-zindex
  top: 0
  left: 0
  position: fixed
  width: 100vw
  height: 100vh
  background-color: black
  opacity: 0.6
  .spinner
    width: 20vmax
    height: 20vmax
    position: relative
    margin: 100px auto

  .double-bounce1
    width: 100%
    height: 100%
    border-radius: 50%
    background-color: #333
    opacity: 0.6
    position: absolute
    top: 0
    left: 0
    -webkit-animation: sk-bounce 2.0s infinite ease-in-out
    animation: sk-bounce 2.0s infinite ease-in-out

  .double-bounce2
    width: 100%
    height: 100%
    border-radius: 50%
    background-color: #333
    opacity: 0.6
    position: absolute
    top: 0
    left: 0
    -webkit-animation: sk-bounce 2.0s infinite ease-in-out
    animation: sk-bounce 2.0s infinite ease-in-out
    -webkit-animation-delay: -1.0s
    animation-delay: -1.0s

  @-webkit-keyframes sk-bounce
    0%, 100%
      -webkit-transform: scale(0)
    50%
      -webkit-transform: scale(1)

  @keyframes sk-bounce
    0%, 100%
      transform: scale(0)
      -webkit-transform: scale(0)
    50%
      transform: scale(1)
      -webkit-transform: scale(1)
</style>
