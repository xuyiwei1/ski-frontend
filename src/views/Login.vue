<template>
  <div class="login">
    <h1>Welcome To Ski Bar</h1>
    <el-form class="LoginForm" :model="LoginForm">
      <el-form-item label="UserName">
        <el-input type="username" class="el-input_login" v-model="LoginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input class="el-input_login" v-model="LoginForm.password" type="password"></el-input>
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
      this.$axios.post("/user/login",this.LoginForm).then((resp)=>{
        //存储用户信息和token到localStorage
        console.log("@UserInfo",resp)
        //判断用户是否登陆成功
        if(resp.data.code === 1002) {
          this.$message({
            message: 'username or password is wrong',
            type: 'error'
          });
          return
        }
        this.$store.commit("SET_TOKEN",resp.data.data);
        this.$store.commit("SET_USERINFO",this.LoginForm.username)
        this.$message({
          message: 'login successful',
          type: 'success'
        });

        // TODO 根据用户的类别判断跳转到用户主页面还是管理员主界面
        this.$router.replace("/competition")
      })
    },
    registerUser() {
      //用户点击注册按钮跳转到注册页面
      this.$router.push("/userReg")
    },
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
.el-input_login{
  width:300px;
}
</style>
