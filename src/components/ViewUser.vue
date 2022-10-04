<template>
  <div style="width = 100%">
    <UserNav></UserNav>
    <div style="width=100%;">
      <div class="viewUser">
        <h1 style="font-size:50px">My Information
        </h1>
        <el-form class="UserEditForm" :model="UserEditForm">
          <el-form-item>
            Username:&nbsp;&nbsp;<el-input class="el-input_edit" type="username"
                                           v-model="UserEditForm.username"></el-input>
          </el-form-item>
          <el-form-item>
            Age&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input class="el-input_edit"
                                                                                           v-model="UserEditForm.age"></el-input>
          </el-form-item>
          <el-form-item>
            Telephone&nbsp;<el-input class="el-input_edit" v-model="UserEditForm.telephone"></el-input>
          </el-form-item>
          <el-form-item>
            Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input class="el-input_edit"
                                                                                 v-model="UserEditForm.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-top:20px" @click="updateUserInfo">Update</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <hr class="rank_hr">
    <h1 style="color:white">My Competiton</h1>
    <div class="acForm_comp" v-for="item in competition" :key="item.activity_id">
      <div class="divHeader">
        <h3>ID:{{ item.activityId }}</h3>
        <h3>Name:{{ item.name }}</h3>
      </div>
      <div class="divMiddle">
        <span class="span_edit">Address:&nbsp;{{ item.address }}</span> <br>
        <span class="span_edit">Time:&nbsp;{{ item.startTime }} to {{ item.endTime }}</span> <br>
        <span class="span_edit">Level:&nbsp;{{ item.level }}</span> <br>
        <span class="span_edit">People:&nbsp;{{ item.remainPerson }}/{{ item.allPerson }}</span>
      </div>
      <div style="width: 9%;height: 100%;float:left">
        <el-button class="el-button_viewUser" type="info" @click="exitCompetition(item.activityId)">Exit</el-button>
        <br>
        <el-button class="el-button_viewUser" @click="viewCompetitionInfo(item.activityId)" type="info">View</el-button>
        <br>
        <el-button class="el-button_viewUser"  type="info">Chat</el-button>
      </div>
    </div>
  </div>

</template>

<script>
import UserNav from '@/components/UserNav.vue';

export default {
  components: {
    UserNav,
  },
  name: 'ViewUser',
  data() {
    return {
      UserEditForm: {
        username: "Jack",
        password: "5456456",
        age: "22",
        telephone: "1311313",
        email: "xxx@qq.com",
      },
      competition: [
        {
          activityId: "1",
          name: "run",
          address: "Beijing",
          startTime: "2022-10-10",
          endTime: "2022-11-1",
          level: 'Skilled',
          allPerson: 6,
          remainPerson: 5
        },
        {
          activity_id: "2",
          activity_name: "jump",
        }
      ],
    }
  },
  methods: {
    //根据用户id查询用户信息
    getUserInfoById() {
      const userIdByAdmin = this.$store.getters.getUserId
      let userId = this.$store.getters.getUser.userId
      //判断是管理员查看用户界面还是用户自己查询自己的界面
      if(userIdByAdmin !== '' && userIdByAdmin.length !== 0) {
        userId = userIdByAdmin
        //删除用户的ID，由管理员界面传来的
        this.$store.commit("REMOVE_USER_ID")
      }
      console.log(userId)
      this.$axios.get("/user/myself?userId="+userId).then((resp)=>{
        console.log("userInfo",resp)
        this.UserEditForm = resp.data.data
      })
    },
    //更新用户个人信息
    updateUserInfo() {
      //请求后端更改信息
      this.$axios.post("/user/myself/update",this.UserEditForm).then((resp)=>{
        console.log("updateInfo",resp)
        if(resp.data.code === 200) {
          this.$message({
            message: 'updated user information success',
            type: 'success',
            duration: 2000
          });
        }
      })
    },
    //TODO 获取某个用户参加的所有活动
    getActivityByUserId() {
      const userId = this.$store.getters.getUser.userId
      this.$axios.get("/activity-records/userpreviousactivityrecord/"+userId).then((resp)=>{
        console.log("@userCompetition",resp)
        this.competition = resp.data.data
      })
    },
    //退出活动
    exitCompetition(activityId) {
      // 退出竞赛活动，需要用户的id和活动的id
      console.log("@exitCompetition",activityId)
      const userId = this.$store.getters.getUser.userId
      this.$axios.get("/activity-records/exitactivity/"+userId+"/"+activityId).then((resp)=>{
        console.log("@exit",resp)
        //提示用户退出成功或失败
        if(resp.data.code === 200) {
          this.$message({
            message: 'exit competition success',
            type: 'success',
            duration: 1000
          });
        }else {
          this.$message({
            message: 'You did not join the competition',
            type: 'error',
            duration: 1000
          });
        }
        this.getActivityByUserId()
      })
    },
    //查看活动详情
    viewCompetitionInfo(activityId) {
      //存储ActivityId
      this.$store.commit("SET_ACTIVITY_ID",activityId);
      // 跳转到竞赛详情页面
      this.$router.push("/viewCompetition")
    }
  },
  mounted() {
    this.getUserInfoById()
    this.getActivityByUserId()
  }
};
</script>

<style>
body {
  width: 100%;
  height: 100%;
}

* {
  margin: 0;
  padding: 0;
}

.viewUser {
  width: 100%;
  height: 600px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.5);
}

.UserEditForm {
  margin: 10px;
}

.el-input_edit {
  width: 300px;
  margin-top: 20px;
}

.rank_hr {
  margin-top: 5px;
  color: black;
}

.acForm_comp {
  height: 150px;
  width: 98%;
  border: 3px solid black;
  margin: 5px;
  border-radius: 5px;
  background-color: white;
}

.divHeader {
  width: 25%;
  height: 100%;
  border-right: 3px solid black;
  float: left;
}

.el-button_viewUser {
  height: 40px;
  width: 70px;
  margin-top: 5px;
  margin-left: 5px;
}

.divMiddle {
  width: 64%;
  height: 100%;
  border-right: 3px solid black;
  float: left;
  text-align: left;
}

.span_edit {
  display: inline-block;
  margin-top: 5px;
  margin-left: 5px;
  font-weight: 600;
}
</style>
