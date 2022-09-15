<template>
  <div>
    <Nav></Nav>
    <UserInfo></UserInfo>
  </div>
</template>

<script>
import Nav from './Nav.vue';
import UserInfo from './UserInfo.vue';

export default {
  name: 'Admin',
  components: {
    Nav,
    UserInfo
  }
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
}

</style>
