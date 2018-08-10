<template>
  <div class="loading-container">
    <div class="spinner"></div>
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
    width: 10vmax
    height: 10vmax
    background-color: #333
    margin: 100px auto
    -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out
    animation: sk-rotateplane 1.2s infinite ease-in-out

  @-webkit-keyframes sk-rotateplane
    0%
      -webkit-transform: perspective(120px)
    50%
      -webkit-transform: perspective(120px) rotateY(180deg)
    100%
      -webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg)

  @keyframes sk-rotateplane
    0%
      transform: perspective(120px) rotateX(0deg) rotateY(0deg)
      -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
    50%
      transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
      -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
    100%
      transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg)
      -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg)
</style>
