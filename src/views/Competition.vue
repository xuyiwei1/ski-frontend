<template>
  <div>
    <!--顶部的信息组件，用于展示用户的用户名信息，退出登陆等功能，表示当前系统是哪个用户使用中  -->
    <UserNav></UserNav>

    <el-button  class="el-button1_comp" @click="addCompetition">Add Competition</el-button>
    <div>
    <el-input  class="el-input_comp" v-model="keywords" clearable placeholder=" Please Input Competition"></el-input>
    <el-button icon="el-icon-search" @click="searchCompetition" circle></el-button>
    </div>
    <div class="acForm_comp" v-for="item in competition" :key="item.activity_id">
        <div class="divHeader">
                <h3>ID:{{item.activityId}}</h3>
                <h3>Name:{{item.name}}</h3>
            </div>
            <div class="divMiddle">
                <span class="span_comp">Address:&nbsp;{{item.address}}</span> <br>
                <span class="span_comp">Time:&nbsp;{{item.startTime}} to {{item.endTime}}</span> <br>
                <span class="span_comp">Level:&nbsp;{{getLevel(item.level)}}</span> <br>
                <span class="span_comp">People:&nbsp;{{item.remainPerson}}/{{item.allPerson}}</span>
            </div>
            <div style="width: 9%;height: 100%;float:left">
                <el-button class="el-button_comp" type="primary" @click="joinCompetition(item.activityId)">Join</el-button> <br>
                <el-button class="el-button_comp" type="info" @click="exitCompetition(item.activityId)">Exit</el-button> <br>
                <el-button class="el-button_comp" @click="viewCompetitionInfo(item.activityId)" type="info">View</el-button>
            </div>
    </div>
  </div>
</template>

<script>
  import UserNav from '@/components/UserNav.vue';
export default {
  name: "Competition",
  components:{
        UserNav
      },
  data() {
    return {
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
      // 跳转到竞赛详情页面
      this.$router.push("/viewCompetition")
    },
    //添加比赛
    addCompetition() {
      //跳转到添加比赛页面
      this.$router.push("/addCompetition")
    },
    //加入竞赛活动
    joinCompetition(activityId) {
      //加入竞赛活动，需要用户的id和活动id
      console.log("@joinCompetition",activityId)
      //从localStorage中获得当前用户的id
      const userId = this.$store.getters.getUser.userId
      console.log("userId",userId)
      //请求加入竞赛活动
      this.$axios.get('/activity-records/add/'+userId+"/"+activityId).then((resp) => {
        if(resp.data.code === 200) {
          this.$message({
            message: 'add competition success',
            type: 'success',
            duration: 2000
          });
          this.getActivityList()
        }else if(resp.data.code === 601) {
          this.$message({
            message: 'This competition has not been approved',
            type: 'warning',
            duration: 2000
          });
        }else {
          this.$message({
            message: 'You have already join this competition',
            type: 'warning',
            duration: 2000
          });
        }
      })
    },
    //退出活动
    exitCompetition(activityId) {
      //TODO 退出竞赛活动，需要用户的id和活动的id，从localStorage取但是后端没有返回，活动ID查出来的和数据库不一致
      console.log("@exitCompetition",activityId)
      const userId = this.$store.getters.getUser.userId
      this.$axios.get("/activity-records/exitactivity/"+userId+"/"+activityId).then((resp)=>{
        console.log(resp)
        //提示用户退出成功或失败
      })
    },
    //转换level对应的值1->Beginner...
    getLevel(numLevel) {
      console.log(numLevel === 1)
      if(numLevel === 1) {
        return 'Beginner'
      }else if(numLevel === 2) {
        return 'Skilled'
      }else {
        return 'Elite'
      }
    }
  },
  mounted() {
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
.el-input_comp{
  width: 400px;
  margin-bottom: 20px;
}
.acForm_comp {
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
}
.el-button_comp{
  height: 40px;
  width: 70px;
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
.span_comp{
  display: inline-block;
  margin-top: 5px;
  margin-left: 5px;
  font-weight: 600;
}
.el-button1_comp{
  float:left;
  width:200px;
  margin-left: 5px;
}

</style>
