<template>
  <div>
    <Nav></Nav>
    <div class="ApproveComInfo">
      <div class="acForm" v-for="item in competition" :key="item.activity_id">
        <div class="divHeader">
          <h3 class="headerh3">ID:{{ item.activityId }}</h3>
          <h3 class="headerh3">Name:{{ item.name }}</h3>
        </div>
        <div class="divMiddle">
          <span class="span1">Address:&nbsp;{{ item.address }}</span> <br>
          <span class="span1">Time:&nbsp;{{ item.startTime }} to {{ item.endTime }}</span> <br>
          <span class="span1">Level:&nbsp;{{ getLevel(item.level) }}</span> <br>
          <span class="span1">People:&nbsp;{{ item.remainPerson }}/{{ item.allPerson }}</span>
        </div>
        <div style="width: 9%;height: 100%;float:left">
          <el-button type="primary" class="el-button2" @click="passActivity(item.activityId)">Pass</el-button>
          <br>
          <el-button type="info" class="el-button2" @click="rejectActivity(item.activityId)">Reject</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav";

export default {
  name: "ApproveComInfo",
  data() {
    return {
      competition: [
        {
          activityId: "1",
          name: "run",
          address: "Beijing",
          startTime: "2022-10-10",
          endTime: "2022-11-1",
          level: 'Skilled',
          allPerson: '6',
          remainPerson: '5'
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
      keywords: ''
    };
  },
  components: {
    Nav
  },
  methods: {
    //获取比赛的详细信息
    getCompetitionInfo() {
      const activityId = this.$store.getters.getActivityId
      console.log("@activityId", activityId);
      this.$axios.get("/activity/detail/" + activityId).then((resp) => {
        console.log(resp)
        // 展示查询到的比赛详细信息 和 排名 页面需要修改？
        /*{ 这是从后端查询到的id为1的比赛信息
          "activityId": 1,
            "userId": 1,
            "name": "niuniu",
            "description": "niuniuzi",
            "allPerson": 5,
            "remainPerson": 4,
            "startTime": "2022-09-14 18:01:24",
            "endTime": "2022-09-14 18:01:24",
            "state": 1,
            "approve": 0,
            "createTime": "2022-09-23 16:54:13",
            "updateTime": "2022-09-21 16:54:16",
            "level": 1,
            "address": "beijing"
        }*/
      })
    },
    //获取活动（竞赛列表）
    getCompetitionList() {
      this.$axios.get("/activity/list").then((resp) => {
        console.log("@activityList", resp)
        //resp.data.data
        this.competition = resp.data.data
      })
    },
    jumpToCompetitionPage() {
      //跳转到添加比赛页面
      this.$router.push("/addCompetition")
    },
    //转换level对应的值1->Beginner...
    getLevel(numLevel) {
      console.log(numLevel === 1)
      if (numLevel === 1) {
        return 'Beginner'
      } else if (numLevel === 2) {
        return 'Skilled'
      } else {
        return 'Elite'
      }
    },
    //获取所有未获得授权的活动
    getUnapprovedActivity() {
      this.$axios.get("/admin/UnApprovalList").then((resp)=>{
        console.log("unapprove",resp)
        this.competition = resp.data.data
      })
    },
    //批准活动
    passActivity(activityId) {
      this.$axios.get("/admin/approval/"+activityId).then((resp)=>{
        console.log("approve",resp)
        if(resp.data.code === 200) {
          this.$message({
            message: 'Approval activity passed',
            type: 'success',
            duration: 2000
          });
        }
        //刷新未审批的活动列表
        this.getUnapprovedActivity()
      })
    },
    // 拒绝活动:直接删除该活动
    rejectActivity(activityId) {
      this.$axios.get('/activity/'+activityId).then((resp)=>{
        console.log("reject",resp)
        if(resp.data.code === 200) {
          this.$message({
            message: 'The activity was rejected successfully',
            type: 'success',
            duration: 2000
          });
        }
        //刷新未审批的活动列表
        this.getUnapprovedActivity()
      })

    }
  },
  watch: {
    //监视keywords keyword发生改变重新请求后端获取数据
    keywords() {
      if (this.keywords !== '') {
        this.searchCompetition()
      } else {
        this.getCompetitionList()
      }
    }
  },
  mounted() {
    //this.getCompetitionInfo();
    this.getUnapprovedActivity()
  }
};
</script>

<style>
body {
  width: 100%;
  height: 100%;
}

.el-input_info {
  width: 400px;
  margin-bottom: 10px;
  margin-top: 5px;
}

.acForm {
  height: 100px;
  width: 98%;
  border: 1px solid black;
  margin: 5px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.5);
}

.headerh3 {
  margin: 5px;
}

.divHeader {
  width: 25%;
  height: 100%;
  border-right: 3px solid black;
  float: left;
  text-align: left;
}

.el-button1 {
  float: left;
  margin-top: 5px;
  width: 200px;
}

.el-button2 {
  width: 80px;
  height: 40px;
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

.span1 {
  display: inline-block;
  margin-top: 5px;
  margin-left: 5px;
  font-weight: 600;
}

.ApproveComInfo {
  width: 74%;
  height: 100%;
  float: left;
}
</style>
