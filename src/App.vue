<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Login from "@/views/Login";
import chatroom from "@/components/ChatRoom";

export default {
  name: 'App',
  components: {
    chatroom
  },
  mounted() {
    this.$router.replace('/messagechat')
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
  height: 100%;
  width: 100%;
}
</style>
