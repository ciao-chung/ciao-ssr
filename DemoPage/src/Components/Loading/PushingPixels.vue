<template>
  <div class="loading-container">
    <div class="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
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
  display: table
  opacity: 0.6
  .loading
    text-align: center
    vertical-align: middle
    display: table-cell
  .loading span
    top: 50%
    display: inline-block
    width: 15px
    height: 15px
    margin: 5px
    background: #007DB6
    border-radius: 50%
    -webkit-animation: loading 1s infinite alternate
    animation: loading 1s infinite alternate
    &:nth-of-type(2)
      background: #008FB2
      -webkit-animation-delay: 0.2s
      animation-delay: 0.2s
    &:nth-of-type(3)
      background: #009B9E
      -webkit-animation-delay: 0.4s
      animation-delay: 0.4s
    &:nth-of-type(4)
      background: #00A77D
      -webkit-animation-delay: 0.6s
      animation-delay: 0.6s
    &:nth-of-type(5)
      background: #00B247
      -webkit-animation-delay: 0.8s
      animation-delay: 0.8s
    &:nth-of-type(6)
      background: #5AB027
      -webkit-animation-delay: 1.0s
      animation-delay: 1.0s
    &:nth-of-type(7)
      background: #A0B61E
      -webkit-animation-delay: 1.2s
      animation-delay: 1.2s
  @-webkit-keyframes loading
    0%
      opacity: 0

    100%
      opacity: 1


  @keyframes loading
    0%
      opacity: 0

    100%
      opacity: 1
</style>
