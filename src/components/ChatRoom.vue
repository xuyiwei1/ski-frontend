<template>
    <div class="chatroom">
        <div style=" margin-bottom: 50px">
    <el-row>
      <el-col :span="4">
        <el-card style="width: 300px; height: 400px;margin-top:100px; color: #333">
         <div style="padding-bottom: 10px; overflow:auto; border-bottom: 1px solid #ccc">Online User<span style="font-size: 12px">(Click the user to chat privately)</span></div>
          <div style="padding: 10px 0" v-for="item in users" :key="item">
            <img v-bind:src="circleUrl" style="height: 25px; width: 25px;">
            <span>{{ item }}</span>
            <i class="el-icon-chat-dot-round" style="margin-left: 10px; font-size: 16px; cursor: pointer"
               @click="select(item)"></i>
            <span style="font-size: 12px;color: limegreen; margin-left: 5px" v-if="item === chatUser">chatting...</span>
          </div>
        </el-card>
      </el-col>

      <el-col  :span="20">
        <div style="width: 600px;height:632px;  margin: 0 auto; margin-top:100px;background-color: white;
                    border-radius: 5px; box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.5);">
          <div style="text-align: center; line-height: 70px;">
            <h1>Group {{ groupID }} ChatRoom</h1>
          </div>
          <div style="height: 350px; overflow:auto; border-top: 1px solid #ccc" v-html="content"></div>
          <div style="height: 200px">
            <textarea v-model="text" style="height: 160px; width: 100%;border: none; border-top: 1px solid #ccc;
             border-bottom: 1px solid #ccc; outline: none"></textarea>
            <div style="text-align: right; padding-right: 10px">
              <el-button type="primary" size="medium" @click="send">Send</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
    </div>
</template>

<script>
export default {
  name:'ChatRoom',
  data() {
    return {
      socket: null,
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      user: {},
      users: [],
      chatUser: '',
      groupID:'',
      text: "",
      content: '',
      sendUser:''
    }
  },
  created() {
    this.init()
    //绑定事件
	  window.addEventListener('beforeunload', e => this.closeWebsocket(e))
  },
  beforeDestroy() {
	  //卸载事件
 	  window.removeEventListener('beforeunload', e => this.closeWebsocket(e))
  },
  methods: {
    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    closeWebsocket(e){
      if(this.socket){
        this.socket.close();
              let _this=this
              this.socket.onclose = function(evt) {
                  console.log("websocket已关闭");
              };
      }
    },
    select(item){
      //选择用户进行私聊
      if (this.chatUser == item){
        this.chatUser = '';
      }else {
        this.chatUser = item;
      }
    },
    send() {
      if (!this.text) {
        this.$message({type: 'warning', message: "请输入内容"})
      } else {
        if (typeof (WebSocket) == "undefined") {
          console.log("您的浏览器不支持WebSocket");
        } else {
          console.log("您的浏览器支持WebSocket");

          let message = this.text;
          //判断是群发还是私发
          console.log(message);
          //获取发送对象
          let tousername = this.chatUser;
          //获取发送消息
          let tomessage = message;
          console.log(tousername);
          console.log(tomessage);
          let param;
          if(tousername){
              //私发
              console.log("私发")
              param = {};
              param['username'] = this.user;
              param['message'] = tomessage;
              param['type'] = '私发';
              param['tousername'] = tousername;
          }
          else{
              //群发
              console.log("群发")
              param = {};
              param['username'] = this.user;
              param['message'] = message;
              param['type'] = '群发';
              param['tousername'] = '';
          }

          // 组装待发送的消息 json
          this.socket.send(JSON.stringify(param));  // 将组装好的json发送给服务端，由服务端进行转发
          // 构建消息内容，本人消息
          this.sendUser = this.user;
          console.log("发送前 "+this.sendUser)
          this.createContent(null, this.user, message)
          this.text = '';
        }
      }
    },
    createContent(remoteUser, nowUser, mydata, sendUser) {  // 这个方法是用来将 json的聊天消息数据转换成 html的。
      let html = '';

      //更新content的内容（上线）
      if(mydata.messageType=="1"){
        html = "<span style=\"width: 100%; height: 30px;line-height: 30px;font-size: 14px;\">" + mydata.username +"上线了"+"</span><br>";
      }
      //更新content的内容（下线）
      if(mydata.messageType=="2"){
          // console.log("成功")
          html = "<span style=\"width: 100%;height: 30px;line-height: 30px;font-size: 14px;\">"+ mydata.username +"下线了"+"</span><br>";
      }

      //更新content的内容（更新用户群发消息）
      // 当前用户消息
      if (nowUser) { // nowUser 表示是否显示当前用户发送的聊天消息，绿色气泡
        html = "<div class=\"el-row\" style=\"padding: 5px 0\">\n" +
            "  <div class=\"el-col el-col-22\" style=\"text-align: right; padding-right: 10px\">\n" +
            "    <div class=\"tip left\">" + mydata + "</div>\n" +
            "  </div>\n" +
            "  <div class=\"el-col el-col-2\">\n" +
            "  <span style=\"height: 40px; width: 40px; line-height: 40px;\">\n" +
            nowUser+
            "  </span>\n" +
            "  </div>\n" +
            "</div>";
      }
      console.log("第一个"+html)
      console.log("sendUser 是 "+sendUser)
      if (mydata.messageType=="4" && sendUser == '') {   // 表示远程用户聊天消息，蓝色的气泡
      console.log("**************************** "+mydata.toUsername)
        if(mydata.toUsername){
          html = "<div class=\"el-row\" style=\"padding: 5px 0\">\n" +
            "  <div class=\"el-col el-col-2\" style=\"text-align: right\">\n" +
            "  <span style=\"height: 40px; width: 40px; line-height: 40px;\">\n" +
            mydata.username +
            " <span style=\"font-size: 5px;color: green;\"> (private) </span>\n" +
            "  </span>\n" +
            "  </div>\n" +
            "  <div class=\"el-col el-col-22\" style=\"text-align: left; padding-left: 10px\">\n" +
            "    <div class=\"tip right\">" + mydata.textMessage + "</div>\n" +
            "  </div>\n" +
            "</div>";
        } else{
          html = "<div class=\"el-row\" style=\"padding: 5px 0\">\n" +
            "  <div class=\"el-col el-col-2\" style=\"text-align: right\">\n" +
            "  <span style=\"height: 40px; width: 40px; line-height: 40px;\">\n" +
            mydata.username+
            "  </span>\n" +
            "  </div>\n" +
            "  <div class=\"el-col el-col-22\" style=\"text-align: left; padding-left: 10px\">\n" +
            "    <div class=\"tip right\">" + mydata.textMessage + "</div>\n" +
            "  </div>\n" +
            "</div>";
        }
      }

      console.log("第二个"+html)
      this.content += html;
    },
    init() {
      // this.user = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : {}
      //let username = "用户"+Math.ceil(Math.random()*100);
      //let groupId = Math.ceil(Math.random()*2);
      let username = sessionStorage.getItem("username");
      let groupId = sessionStorage.getItem("activityName");
      this.user = username;
      this.groupID = groupId;

      let _this = this;
      if (typeof (WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
      } else {
        console.log("您的浏览器支持WebSocket");
        let socketUrl = "ws://localhost:8181/websocket/"+username+"/"+groupId;
        if (this.socket != null) {
          this.socket.close();
          this.socket = null;
        }
        // 开启一个websocket服务
        this.socket = new WebSocket(socketUrl);
        let mysocket = this.socket;

        //打开事件
        mysocket.onopen = function () {
          console.log("websocket已打开");
        };
        //  浏览器端收消息，获得从服务端发送过来的文本消息
        mysocket.onmessage = function (msg) {
          console.log("收到数据====" + msg.data)
          let data = JSON.parse(msg.data)  // 对收到的json数据进行解析
          if (data.messageType=="3") {  // 获取在线人员信息
            _this.users = data.onlineUsers.filter(item => item !== username)  // 获取当前连接的所有用户信息，并且排除自身，自己不会出现在自己的聊天列表里
          } else {
              // 构建消息内容
              _this.createContent(1,null,data,_this.sendUser)
              _this.sendUser = '';
              console.log("这是接收时的"+_this.sendUser);
          }
        };
        //关闭事件
        mysocket.onclose = function () {
          console.log("websocket已关闭");
        };
        //发生了错误事件
        mysocket.onerror = function () {
          console.log("websocket发生了错误");
        }
      }
    }
  }
}
</script>

<style>
  .tip {
    color: white;
    text-align: center;
    border-radius: 10px;
    font-family: sans-serif;
    padding: 10px;
    width:auto;
    display:inline-block !important;
    display:inline;
  }

  .right {
    background-color: deepskyblue;
  }
  .left {
    background-color: forestgreen;
  }
</style>
