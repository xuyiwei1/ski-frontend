<template>
    <div class="user_nav">
        <div class="user_div">
        <span class="span_user">UserName: {{userInfo.username}}</span>
        <!-- 点击按钮退出 -->
        <el-button class="el-button_usernav" type="info" >Exit</el-button>
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