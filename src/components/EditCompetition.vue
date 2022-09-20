<template>
    <div class="UpdateCompetition">
        <h1>Update Competition Information</h1>
      <el-form class="UpdateCompetitionForm" :model="UpdateCompetitionForm">
        <el-form-item >
      Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input class="el-input_edit" type="name" v-model="UpdateCompetitionForm.name"></el-input>
        </el-form-item>
        <el-form-item >
      Address:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input class="el-input_edit" v-model="UpdateCompetitionForm.address"></el-input>
        </el-form-item>
        <el-form-item >
          StartTime:&nbsp;&nbsp;&nbsp;<el-input class="el-input_edit" v-model="UpdateCompetitionForm.startTime"></el-input>
        </el-form-item>
        <el-form-item >
          EndTime:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input class="el-input_edit" v-model="UpdateCompetitionForm.endTime"></el-input>
        </el-form-item>
        <el-form-item >
          MaxPeople:&nbsp;<el-input class="el-input_edit" v-model="UpdateCompetitionForm.allPerson"></el-input>
        </el-form-item>
        Level:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-select class="el-select_edit" v-model="level" placeholder="Please">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> <br>
        <span class="score_span">Score</span>
        <ul>
          <li v-for="p in Rank" :key="p.userId">
          <!-- 输入用户成绩 -->
          <!-- 获取用户的姓名 -->
          Name:{{p.username}}<el-input class="score_input" v-model="p.score"></el-input>
            <!-- 点击提交时 返回到成绩表中-->
          </li>
        </ul>
        <el-form-item>
          <el-button @click="Submit">Submit</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: "EditCompetition",
        UpdateCompetitionForm: {
          name: "",
          adress: "",
          startTime: "",
          endTime: "",
          allPerson:""
        },
        options: [
          {
            value: "1",
            label: "Beginner",
          },
          {
            value: "2",
            label: "Skilled",
          },
          {
            value: "3",
            label: "Elite",
          },
        ],
        Rank:[
        {
            userId:'1',
            username:'jack',
            activityId:'1',
            score:'22',
        },
        {
            userId:'2',
            username:'dall',
            activityId:'1',
            score:'',
        },
        {
            userId:'3',
            username:'jack',
            activityId:'1',
            score:'22',
        },
        ],
        level: "",
      };
    },
    methods: {
      Submit() {},
    },
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
  .UpdateCompetition {
    width: 800px;
    height: 800px;
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
  .UpdateCompetitionForm {
    margin: 10px;
  }
  .el-input_edit{
      width: 300px;
  }
  .el-select_edit{
      margin-bottom: 20px;
      width: 300px;
  }
   
  h1{
    margin-top: 10px;
  }
  .score_span{
    display: inline-block;
    font-size: 30px;
  }
  .score_input{
    margin-left: 10px;
    margin-bottom: 10px;
    width: 300px;
  }
  </style>