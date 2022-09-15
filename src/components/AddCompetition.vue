<template>
    <div class="add">
        <h1>Add Competition</h1>
      <el-form class="AddCompetitionForm" :model="AddCompetitionForm">
        <el-form-item >
      Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input type="name" v-model="AddCompetitionForm.name"></el-input>
        </el-form-item>
        <el-form-item >
      Address:&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model="AddCompetitionForm.address"></el-input>
        </el-form-item>
        <el-form-item >
          StartTime:&nbsp;&nbsp;<el-input v-model="AddCompetitionForm.startTime"></el-input>
        </el-form-item>
        <el-form-item >
          EndTime:&nbsp;&nbsp;&nbsp;<el-input v-model="AddCompetitionForm.endTime"></el-input>
        </el-form-item>
        <el-form-item >
          MaxPeople:<el-input v-model="AddCompetitionForm.allPerson"></el-input>
        </el-form-item>
        Level:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-select v-model="value" placeholder="Please">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
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
        name: "AddCompetition",
        AddCompetitionForm: {
          name: "",
          adress: "",
          startTime: "",
          endTime: "",
          allPerson:""
        },
        radio: "1",
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
        value: "",
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
  .add {
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
  .AddCompetitionForm {
    margin: 10px;
  }
  .el-input{
      width: 300px;
  }
  .el-select{
      margin-bottom: 20px;
  }
  .el-radio{
      margin-bottom: 20px;
  }
  h1{
    margin-top: 10px;
  }
  </style>