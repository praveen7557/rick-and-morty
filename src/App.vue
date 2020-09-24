<template>
  <div id="app">
    <Error />
    <router-view />
  </div>
</template>

<script>
import Error from '@/components/Error'

export default {
  components: {
    Error
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  padding: 30px;
  position: relative;
}
* {
  box-sizing: border-box;
}
</style>
