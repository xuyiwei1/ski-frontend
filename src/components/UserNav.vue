<template>
    <div class="user_nav">
        <div class="user_div">
        <span class="span_user">UserName: {{userInfo.username}}</span> <br>
        <!-- 点击按钮退出 -->
        <el-button class="el-button_usernav" type="info" @click="exitLogin" >Exit</el-button>
        <!-- 点击按钮查看个人信息 -->
        <el-button class="el-button_usernav" type="info" >View</el-button>
    </div>
    </div>
</template>

<script>
    export default{
        data() {
            return {
                name:'UserNav',
                userInfo:{
                    username:'jack'
                }
            }
        },
      methods: {
        //获取用户名
        getUsername() {
          this.userInfo.username = this.$store.getters.getUser.username
        },
        //退出登陆
        exitLogin() {
          this.$axios.get("/user/logout").then((resp) => {
            if(resp.data.code === 200) {
              //删除localStorage存储的个人信息
              this.$store.commit("REMOVE_INFO")
              //跳转到登录页
              this.$router.replace("/login")
              this.$message({
                message: 'logout success',
                type: 'success',
                duration: 2000
              });
            }else {
              this.$message({
                message: 'logout fail',
                type: 'error',
                duration: 2000
              });
            }
          })
        }
      },
      mounted() {
          //加载用户名
          this.getUsername()
      }
    }
</script>

<style>
    .user_nav{
        height: 65px;
        background:rgb(233, 233, 235);

        margin-bottom: 10px;
    }
    .user_div{
        float: right;
        width: 200px;
        height: 40px;

    }
    .span_user{

        display: inline-block;
        color: black;
        font-size: 20px;
        box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.5);
    }
    .el-button_usernav{
        height: 30px;
        float: right;
        margin-top: 5px;
        font-size: 15px;
        background: rgb(233, 233, 235);
        color: black;
        box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.5);
        border: 0;
        margin-left: 2px;
    }
</style>
