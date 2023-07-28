<template>
  <div>
    <div class="count">当前在线人数：{{ count }}</div>
    <div id="chatroom" ref="scrollDiv">
      <p
        v-for="(item, index) in list"
        :key="index"
        :class="(item.role==role&&item.role_user_id == role_user_id) ? 'right' : 'left'"
      >
        <span>{{ item.role_user_id }}</span>
        <span class="content">{{ item.chat_content }}</span>
      </p>
    </div>
    <div class="bot">
      <el-input placeholder="请输入内容" v-model="chat_content" clearable @keyup.enter.native="handleClick">
      </el-input>
      <el-button
        type="primary"
        icon="el-icon-edit"
        circle
        @click="handleClick"
      ></el-button>
    </div>
  </div>
</template>

<script>
var ws = new WebSocket("ws://127.0.0.1:9000/");
export default {
  name: "chatRoom",
  data() {
    return {
      count:1,
      list: [],
      chat_content: "",
    };
  },
  computed: {
    role() {
      return localStorage.getItem('role');
    },
    role_user_id() {
      return localStorage.getItem("username");
    },
  },
  created(){
    this.getData();
  },
  mounted() {
    let that = this;
    ws.onopen = function (event) {
      console.log(event);
      // ws.send('大家好')
    };

    ws.onmessage = function (event) {
      console.log(event);
      let data = JSON.parse(event.data);
      console.log(data);
      if('count' in data){
        that.count = data.count;
      }else{
        that.list.unshift(data);
      } 
      // that.handleScrollBottom();
    };

    ws.onclose = function (event) {
      console.log(event);
      alert("Closed");
    };

    ws.onerror = function (err) {
      alert("Error:" + err);
    };
  },
  methods: {
     // 滚动到顶部
     handleScrollTop() {
      this.$nextTick(() => {
        let scrollElem = this.$refs.scrollDiv;
        scrollElem.scrollTo({ top: 0, behavior: 'smooth' });
      });
    },
    // 滚动到底部
    handleScrollBottom() {
      this.$nextTick(() => {
        let scrollElem = this.$refs.scrollDiv;
        scrollElem.scrollTo({ top: scrollElem .scrollHeight, behavior: 'smooth' });
      });
    },
    getData(){
      this.axios("/users/getChatLog?"+ (new Date()).getTime().toString()).then(res=>{
            console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.list = [...res.data.data,...this.list]
            // this.handleScrollBottom();
        }).catch(err=>{
            console.log(err);
        })
    },
    handleClick() {
      this.data = {
        chat_content: this.chat_content,
        role: this.role,
        role_user_id:this.role_user_id,
      };
      ws.send(JSON.stringify(this.data));
      this.chat_content = "";
    },
  },
};
</script>

<style lang="scss" scoped>
#chatroom {
  width: 400px;
  height: 500px;
  overflow: auto;
  border: 1px solid blue;
  margin: auto;
  display: flex;
  flex-direction: column-reverse;
  > p {
    display: flex;
    align-items: center;
    .content {
      background: #a8a8ff;
      padding: 5px 10px;
      border-radius: 5px;
    }
  }
  .left {
    flex-direction: row;
  }
  .right {
    flex-direction: row-reverse;
  }
}

.bot {
  width: 400px;
  margin: 10px auto;
  display: flex;
}
</style>