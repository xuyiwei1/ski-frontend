<template>
  <div>
    <!--  需要一个顶部的信息组件，用于展示用户的用户名信息，退出登陆等功能...，表示当前系统是哪个用户使用中  -->
    <span style="color: red">username:{{nickname}}</span>
    <el-button round class="el-button1" @click="addCompetition">Add Competition</el-button>
    <div>
    <el-input  v-model="keywords" clearable placeholder=" Please Input Competition"></el-input>
    <el-button icon="el-icon-search" @click="searchCompetition" circle></el-button>
    </div>
    <div class="acForm" v-for="item in competition" :key="item.activity_id">
        <div class="divHeader">
                <h3>ID:{{item.activityId}}</h3>
                <h3>Name:{{item.name}}</h3>
            </div>
            <div class="divMiddle">
                <span>Address:&nbsp;{{item.address}}</span> <br>
                <span>Time:&nbsp;{{item.startTime}} to {{item.endTime}}</span> <br>
                <span>Level:&nbsp;{{item.level}}</span> <br>
                <span>People:&nbsp;{{item.remainPerson}}/{{item.allPerson}}</span>
            </div>
            <div style="width: 9%;height: 100%;float:left">
                <el-button type="primary" @click="joinCompetition(item.activityId)">Join</el-button> <br>
                <el-button type="info" @click="exitCompetition(item.activityId)">Exit</el-button>
                <el-button class="el-button2" @click="viewCompetitionInfo(item.activityId)" type="info">View</el-button>
            </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Competition",
      nickname: '',
      competition: [
        {
          activityId: "1",
          name: "run",
          address:"Beijing",
          startTime:"2022-10-10",
          endTime:"2022-11-1",
          level:'Skilled',
          allPerson: 6,
          remainPerson: 5
        },
        {
          activity_id: "2",
          activity_name: "jump",
        },
        {
          activity_id: "3",
          activity_name: "walk",
        },
      ],
      keywords:''
    };
  },
  watch: {
    //监视keywords keyword发生改变重新请求后端获取数据
    keywords() {
      if(this.keywords !== '') {
        this.searchCompetition()
      }else {
        this.getActivityList()
      }
    }
  },
  methods: {
    //获取用户名
    getNickName() {
      this.nickname = this.$store.getters.getUser
    },
    //获取活动（竞赛列表）
    getActivityList() {
      this.$axios.get("/activity/list").then((resp)=>{
        console.log("@activityList",resp)
        //resp.data.data
        this.competition = resp.data.data
      })
    },
    //查询竞赛（活动）
    searchCompetition() {
      console.log(this.input);
      this.$axios.get("/activity/search/"+this.keywords).then((resp)=>{
        console.log("@respSearch",resp)
        //查询结果回显到data中
        this.competition = resp.data.data
      })
    },
    //查看活动详情
    viewCompetitionInfo(activityId) {
      //存储ActivityId
      this.$store.commit("SET_ACTIVITY_ID",activityId);
      //TODO 跳转到竞赛详情页面 暂无
      this.$router.push("/competitionInfo")
    },
    //添加比赛
    addCompetition() {
      //跳转到添加比赛页面
      this.$router.push("/addCompetition")
    },
    //加入竞赛活动
    joinCompetition(activityId) {
      //TODO 加入竞赛活动，需要用户的id，从localStorage取但是后端没有返回，活动ID查出来的和数据库不一致
      console.log("@joinCompetition",activityId)
    },
    exitCompetition(activityId) {
      //TODO 退出竞赛活动，需要用户的id，从localStorage取但是后端没有返回，活动ID查出来的和数据库不一致
      console.log("@exitCompetition",activityId)
    }
  },
  mounted() {
    //加载用户名
    this.getNickName()
    //加载初始活动
    this.getActivityList()
  }
};
</script>

<style>
body{
  width: 100%;
  background-image: url("../assets/Competition.jpg");
}
.el-input{
  width: 400px;
  margin-bottom: 20px;
}
.acForm {
  height: 150px;
  width: 98%;
  border: 3px solid black;
  margin: 5px;
  border-radius: 5px;
  background-color: white;
}
.divHeader{
  width: 25%;
  height: 100%;
  border-right: 3px solid black;
  float:left;
  background-color:#409EFF ;
}
.el-button{
  height: 40px;
  margin-top: 5px;
  margin-left: 5px;
}
.divMiddle{
  width: 64%;
  height: 100%;
  border-right: 3px solid black;
  float:left;
  text-align: left;
}
span{
  display: inline-block;
  margin-top: 5px;
  margin-left: 5px;
  font-weight: 600;
}
.el-button1{
  float:left;margin-top:5px;width:200px;
}
.el-button2{
  width: 80px;
  height: 40px;
  margin-top: 5px;
  margin-left: 5px;
}
</style>
