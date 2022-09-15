<template>
  <div>
    <div>
    <el-input  v-model="input" clearable placeholder=" Please Input Competition"></el-input>
    <el-button icon="el-icon-search" circle></el-button>  
    </div>
    <div class="acForm" v-for="item in competition" :key="item.activity_id">
        <div class="divHeader">
                <h3>ID:{{item.activityId}}</h3>
                <h3>Name:{{item.name}}</h3>
            </div>
            <div class="divMiddle">
                <span>Address:&nbsp;{{item.address}}</span> <br>
                <span>Time:&nbsp;{{item.stratTime}} to {{item.endTime}}</span> <br>
                <span>Level:&nbsp;{{item.level}}</span> <br>
                <span>People:&nbsp;{{item.remainPerson}}/{{item.allPerson}}</span>
            </div>
            <div style="width: 9%;height: 100%;float:left">
                <el-button type="primary">Join</el-button> <br>
                <el-button type="info">Exit</el-button>
            </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Competition",
      competition: [
        {
          activityId: "1",
          name: "run",
          address:"Beijing",
          stratTime:"2022-10-10",
          endTime:"2022-11-1",
          level:'Skilled',
          allPerson:'6',
          remainPerson:'5'
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
      input:''
    };
  },
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
    height: 100px;
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
</style>
