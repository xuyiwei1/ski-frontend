<template>
  <div class="login">
    <h1>Welcome To Ski Bar</h1>
    <el-form class="LoginForm" :model="LoginForm">
      <el-form-item label="UserName">
        <el-input type="username" v-model="LoginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="LoginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="loginIn">Login</el-button>
        <el-button @click="registerUser">Register</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name:'Login',
      LoginForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    loginIn() {
      //请求后端登陆
      this.$axios.post("http://localhost:8181/user/login",this.LoginForm).then((resp)=>{

        console.log(resp.data)
      })
    },
    registerUser() {},
  },
};
</script>

<style>
    body{
        width: 100%;
        height: 100%;
        /*background-image: url('src/assets/login.jpg');*/
        background-image: url("../assets/login.jpg");
        background-size: cover
    }
    *{
        margin: 0;
        padding: 0;
    }
.login {
  width: 400px;
  height: 300px;
  border: 1px solid black;
  border-radius: 4px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: white;
}
.LoginForm {
  margin: 10px;
}
</style>
