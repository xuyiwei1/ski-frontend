<template>
  <div class="Info">
    <el-form class="UserRegForm" :model="UserRegForm">
      <el-form-item >
    Username:&nbsp;&nbsp;<el-input class="el-input_reg" type="username" v-model="UserRegForm.username"></el-input>
      </el-form-item>
      <el-form-item >
    Password:&nbsp;&nbsp;<el-input class="el-input_reg" v-model="UserRegForm.password" ></el-input>
      </el-form-item>
      Gender&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-radio class="el-radio_reg" v-model="UserRegForm.gender" label="1">Male</el-radio>
      <el-radio v-model="UserRegForm.gender" label="2">Female</el-radio>
      <el-form-item >
        Age&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input class="el-input_reg" v-model="UserRegForm.age"></el-input>
      </el-form-item>
      <el-form-item >
        Telephone&nbsp;<el-input class="el-input_reg" v-model="UserRegForm.telephone"></el-input>
      </el-form-item>
      <el-form-item >
        Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input class="el-input_reg" v-model="UserRegForm.email"></el-input>
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
        username: "",
        password: "",
        age: "",
        telephone: "",
        email:"",
        gender: "1",
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
      value: "",
    };
  },
  methods: {
    Submit() {
      //用户注册
      console.log(this.UserRegForm)
      this.$axios.post("/user/register",this.UserRegForm).then((resp)=>{
        console.log("@resp",resp)
        //判断是否注册成功
        if(resp.data.code === 200) {
          this.$message({
            message: 'registration successful',
            type: 'success',
            duration: 1000
          });
        }else {
          this.$message.error('the user has already registered in the system');
        }
        //跳转到登陆页，用户登陆
        this.$router.replace("/login")
      })
    },
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
.Info {
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
.el-input_reg{
    width: 300px;
}

.el-radio_reg{
    margin-bottom: 20px;
}
</style>
