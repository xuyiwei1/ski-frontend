<template>
  <div class="view">
    <div class="info">
        <h1>Competition Name:{{competition.name}}</h1>
        <br>
    <br>
    <span class="span_view">Address: {{ competition.address }}</span>
    <hr>
   <span class="span_view">StartTime: {{competition.startTime}}</span
    ><hr>
    <span class="span_view">EndTime: {{competition.endTime}}</span
    ><hr>
    <span class="span_view">People: {{competition.remainPerson}}/{{competition.allPerson}}</span
    ><hr>
    <span class="span_view">Level: {{getLevel}}</span><hr>
    <span class="span_view" style="margin-bottom:10px">Rank</span>
        <ol class="ol_view">
            <li class="li_view" v-for="p in user" :key="p.userId">
                {{p.name}}
            </li>
        </ol>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "ViewCompetition",
      competition: {
        activityId: "1",
        name: "run",
        address: "Beijing",
        startTime: "2022-10-10",
        endTime: "2022-11-1",
        level: "Skilled",
        allPerson: "6",
        remainPerson: "5",
      },
      user:[
        {
            userId:'1',
            name:'Jack',
            score:'99'
        },
        {
            userId:'2',
            name:'Tom',
            score:'99'
        }
      ]
    };
  },
  methods: {
    //TODO 根据活动（比赛id）查询活动详细信息
    getCompetitionSpecificInfo() {
      console.log(this.$store.getters.getActivityId)
      this.$axios.get("/activity/detail/"+this.$store.getters.getActivityId).then((resp)=>{
        console.log(resp)
        this.competition = resp.data.data
      })
    }
  },
  mounted() {
    //初始化活动详情
    this.getCompetitionSpecificInfo()
  },
  computed: {
    //使用计算属性转换level对应的值1->Beginner...
    getLevel() {
      if(this.competition.level === 1) {
        return 'Beginner'
      }else if(this.competition.level === 2) {
        return 'Skilled'
      }else {
        return 'Elite'
      }
    }
  }
};
</script>

<style>
body {
  width: 100%;
  height: 100%;
  background-image: url("../assets/addCompetition.jpg");
  background-size: cover;
}
* {
  margin: 0;
  padding: 0;
}
.view {
  width: 800px;
  height: 500px;
  border: 1px solid black;
  border-radius: 10px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: white;
}
.info{
    width: 500px;
    height: 500px;
    position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: white;
}
h1 {
  margin-top: 10px;
}
.span_view {
  float: left;
  width: 500px;
  margin-top: 10px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 20px;
}

.ol_view{
    margin:0px auto;
    width: 100px;
}
.li_view{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 20px;
  margin-top: 5px;
}
</style>
