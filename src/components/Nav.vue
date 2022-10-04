<!--管理员可以看到的导航菜单里面显示用户的信息和比赛的信息-->
<template>
  <div  class="Nav">
    <UserNav></UserNav>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
    >
      <router-link to="/userInfo"><el-menu-item index="1" >

        <span slot="title" class="span_nav">User Information</span>
      </el-menu-item></router-link>
      <router-link to="/competitionInfo"><el-menu-item index="2" >

        <span slot="title" class="span_nav">Competition Information</span>
      </el-menu-item></router-link>

      <el-menu-item index="2" >

<span slot="title" class="span_nav">Approve Competition</span>
</el-menu-item>
    </el-menu>
    <div>
      <router-view/>
    </div>
  </div>
</template>

  <script>
    import UserNav from "@/components/UserNav";

    export default {
      name: 'Nav',
      methods: {
      },
      components: {
        UserNav
      }
    }
  </script>

  <style>
    *{
      margin: 0;
    }
    body{
      width: 100%;
      height: 100%;
    }
    .Nav{
      height:100%;width:25%;float:left;
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
    .span_nav{
      display: inline-block;
      margin-top:110px;
      color: black;
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
  </style>
