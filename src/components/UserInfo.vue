<template>
  <div>
    <Nav></Nav>
    <div class="userInfo">
      <h1>User Information</h1>
      <el-table
          :data="tableData"
          border
          style="width: 100%">
        <el-table-column
            fixed
            prop="userId"
            label="UserID"
            width="200">
        </el-table-column>
        <el-table-column
            prop="username"
            label="Name"
            width="150">
        </el-table-column>
        <el-table-column
            prop="password"
            label="Password"
            width="200">
        </el-table-column>
        <el-table-column
            prop="gender"
            label="Gender"
            width="100">
        </el-table-column>
        <el-table-column
            prop="age"
            label="Age"
            width="100">
        </el-table-column>
        <el-table-column
            prop="telephone"
            label="Telephone"
            width="300">
        </el-table-column>
        <el-table-column
            prop="email"
            label="Email"
            width="300">
        </el-table-column>

        <el-table-column
            fixed="right"
            label="Operation"
            width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="20px">Delete</el-button>
            <el-button type="text" size="20px" @click="editUserInfo(scope.row)">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav";

export default {
  name: 'UserInfo',
  data() {
    return {
      tableData: [{
        userId: '',
        username: 'jack',
        password: 'tttt',
        age: '22',
        gender: '',
        telephone: '3232',
        email: 'dddd@.com',
      },
        {
          userName: 'jack',
          passWord: 'tttt',
          age: '22',
          gender: '',
          telephone: '3232',
          email: 'dddd@.com',
        }]
    }
  },
  components: {
    Nav
  },
  methods: {
    //删除用户
    handleClick(row) {
      console.log("@row",row);
      //删除用户
      this.$axios.get("/admin/"+row.userId).then((resp)=>{
        this.$message({
          message: 'delete success',
          type: 'success',
          duration: 2000
        });
        //刷新用户列表
        this.getUserInfoList()
      })
    },
    //管理员查询用户的信息
    getUserInfoList(){
      this.$axios.get("/admin/allusers").then((resp)=>{
        console.log("@allUsers",resp)
        this.tableData = resp.data.data
        this.tableData.forEach((item) => {
          if(item.gender==='1'){
            item.gender = 'male'
          }else {
            item.gender = 'female'
          }
        })
      })
    },
    //编辑用户信息
    editUserInfo(row) {
      console.log(row.userId)
      this.$store.commit("SET_USER_ID",row.userId)
      this.$router.push("/viewUser")
    }
  },
  mounted() {
    this.getUserInfoList()
  }
}
</script>

<style>

.userInfo {
  width: 74%;
  margin-left: 10px;
  float: left;
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.5);
}
</style>
