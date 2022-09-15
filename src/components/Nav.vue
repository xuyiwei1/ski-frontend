<!--管理员可以看到的导航菜单里面显示用户的信息和比赛的信息-->
<template>
  <div  class="Nav">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
    >
      <router-link to="/userInfo"><el-menu-item index="1" >

        <span slot="title" class="span2">User Information</span>
      </el-menu-item></router-link>
      <router-link to="/competitionInfo"><el-menu-item index="2" >

        <span slot="title" class="span2">Competition Information</span>
      </el-menu-item></router-link>
    </el-menu>
    <div>
      <router-view/>
    </div>
  </div>
</template>

  <script>
    export default {
      name: 'Nav',
      methods: {
      }
    }
  </script>

  <style>
    *{
      margin: 0;
    }
    body{
      width: 100%;
    }
    .Nav{
      height:100%;width:25%;float:left;
    }
    .el-col{
      height: 100%;
      background-color: #909399;
      border-right: px solid #909399;
    }
    .el-menu-vertical-demo{
      height: 100%;
    }
    .el-menu-item{
      height: 25%;
      width: 100%;
      background-color: #909399;
      box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.5);
      font-size: 30px;
      text-align: center;
    }
    .span2{
      display: inline-block;
      margin-top:110px;
      color: black;
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
  </style>
