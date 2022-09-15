<template>
  <div>
    <Nav></Nav>
    <div class="CompetitionInfo">
      <div>
        <el-button round class="el-button1" @click="jumpToCompetitionPage">Add Competition</el-button>
        <el-input v-model="keywords" @click="searchCompetition" clearable placeholder=" Please Input Competition"></el-input>
        <el-button icon="el-icon-search" circle></el-button>
      </div>
      <div class="acForm" v-for="item in competition" :key="item.activity_id">
        <div class="divHeader">
          <h3 class="headerh3">ID:{{ item.activityId }}</h3>
          <h3 class="headerh3">Name:{{ item.name }}</h3>
        </div>
        <div class="divMiddle">
          <span class="span1">Address:&nbsp;{{ item.address }}</span> <br>
          <span class="span1">Time:&nbsp;{{ item.stratTime }} to {{ item.endTime }}</span> <br>
          <span class="span1">Level:&nbsp;{{ item.level }}</span> <br>
          <span class="span1">People:&nbsp;{{ item.remainPerson }}/{{ item.allPerson }}</span>
        </div>
        <div style="width: 9%;height: 100%;float:left">
          <el-button type="primary" class="el-button2">Delete</el-button>
          <br>
          <el-button type="info" class="el-button2">Edit</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav";

export default {
  data() {
    return {
      name: "CompetitionInfo",
      competition: [
        {
          activityId: "1",
          name: "run",
          address: "Beijing",
          stratTime: "2022-10-10",
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
        //TODO 展示查询到的比赛详细信息 和 排名 页面需要修改？
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
    //查询竞赛（活动）
    searchCompetition() {
      console.log(this.input);
      this.$axios.get("/activity/search/" + this.keywords).then((resp) => {
        console.log("@respSearch", resp)
        //查询结果回显到data中
        this.competition = resp.data.data
      })
    }
  },
  watch: {
    //监视keywords keyword发生改变重新请求后端获取数据
    keywords() {
      if(this.keywords !== '') {
        this.searchCompetition()
      }else {
        this.getCompetitionList()
      }
    }
  },
  mounted() {
    //this.getCompetitionInfo();
    this.getCompetitionList()
  }
};
</script>

<style>
body {
  width: 100%;
  height: 100%;
}

.el-input {
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

.CompetitionInfo {
  width: 74%;
  height: 100%;
  float: left;
}
</style>
