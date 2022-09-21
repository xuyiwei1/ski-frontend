<template>
  <div class="add">
    <h1>Add Competition</h1>
    <el-form class="AddCompetitionForm" :model="AddCompetitionForm">
      <el-form-item>
        Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input class="el-input_add" type="name"
                                                                 v-model="AddCompetitionForm.name"></el-input>
      </el-form-item>
      <el-form-item>
        Address:&nbsp;&nbsp;&nbsp;&nbsp;<el-input class="el-input_add" v-model="AddCompetitionForm.address"></el-input>
      </el-form-item>
      <el-form-item>
        StartTime:&nbsp;&nbsp;<el-input class="el-input_add" v-model="AddCompetitionForm.startTime"></el-input>
      </el-form-item>
      <!--  需要使用时间选择器？还是手动输入？    -->
      <el-form-item>
        EndTime:&nbsp;&nbsp;&nbsp;<el-input class="el-input_add" v-model="AddCompetitionForm.endTime"></el-input>
      </el-form-item>
      People:&nbsp;&nbsp;&nbsp;&nbsp;<el-select class="el-select_add" v-model="AddCompetitionForm.allPerson" placeholder="Please">
      <el-option
          v-for="item in MaxPeople"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      >
      </el-option>
    </el-select>
      <br>
      Level:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-select class="el-select_add" v-model="AddCompetitionForm.level" placeholder="Please">
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
  name: "AddCompetition",
  data() {
    return {
      AddCompetitionForm: {
        name: "",
        address: "",
        startTime: "",
        endTime: "",
        level: "",
        allPerson: ''
      },
      radio: "1",
      MaxPeople: [
        {
          value: "1",
          label: "1",
        },
        {
          value: "2",
          label: "2",
        },
        {
          value: "3",
          label: "3",
        },
        {
          value: "4",
          label: "4",
        },
        {
          value: "5",
          label: "5",
        },
        {
          value: "6",
          label: "6",
        }
      ],
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
    };
  },
  methods: {
    //添加一个新的比赛
    Submit() {
      //console.log("@newCompetition",this.AddCompetitionForm)
      this.$axios.post("/activity/create", this.AddCompetitionForm).then((resp) => {
        console.log(resp)
        if (resp.data.code === 200) {
          this.$message({
            message: 'Add competition successful',
            type: 'success',
            duration: 2000
          });
        }
        //TODO 判断当前用户是管理员还是普通用户，跳转到不同的界面，根据localStorage中存储的userInfo
        this.$router.push("/nav")
      })
    }
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

.el-input_add{
  width: 300px;
}

.el-select_add {
  margin-bottom: 20px;
  width: 300px;
}


h1 {
  margin-top: 10px;
}
</style>
