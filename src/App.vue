<template>
  <div id="app">
    <router-link to="/login"/>
    <router-view></router-view>
  </div>
</template>

<script>
import UserReg from "@/components/UserReg";

export default {
  name: 'App',
  components: {
    UserReg
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
