<template>
  <div class="login">
    <el-form class="UserRegForm" :model="UserRegForm">
      <el-form-item >
    Username:&nbsp;&nbsp;<el-input type="username" v-model="UserRegForm.username"></el-input>
      </el-form-item>
      <el-form-item >
    Password:&nbsp;&nbsp;<el-input v-model="UserRegForm.passWord"></el-input>
      </el-form-item>
      Gender&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-radio v-model="radio" label="1">male</el-radio>
      <el-radio v-model="radio" label="2">female</el-radio>
      <el-form-item >
        Age&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model="UserRegForm.age"></el-input>
      </el-form-item>
      Level&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-select v-model="value" placeholder="Please">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-form-item >
        Telephone&nbsp;<el-input v-model="UserRegForm.Telephone"></el-input>
      </el-form-item>
      <el-form-item >
        Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input  v-model="UserRegForm.Email"></el-input>
      </el-form-item>
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
      name: "UserReg",
      UserRegForm: {
        userName: "",
        passWord: "",
        age: "",
        Telephone: "",
        Email:""
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
  background-image: url("../assets/login.jpg");
  background-size: cover;
}
* {
  margin: 0;
  padding: 0;
}
.login {
  width: 400px;
  height: 500px;
  border: 1px solid black;
  border-radius: 4px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: white;
}
.UserRegForm {
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
</style>
