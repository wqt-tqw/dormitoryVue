<template>
  <div id="notice">
    <div id="noticeDeail">
      <h3>{{fromData.noticeTheme}}--------{{fromData.noticeTime}}</h3>
      <div>{{fromData.noticeContent}}</div>
      <div style="text-align: center;">
        <el-button type="info" @click="handleClick()">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'noticeDeail',
     data() {
      return {
        fromData: []
      }
    },
    mounted () {

      // if(this.$store.state.dormitoryAdminlist){
      //   //ajax请求
      //   this.$store.dispatch('selectnotice')
      //       this.tableData=this.$store.state.dormitoryAdminlist.data
      //       this.total=this.$store.state.dormitoryAdminlist.total
      // }else{
      //   console.log('使用缓存数据')
      // }
        this.axios("/admin/selectnotice?noticeId="+this.$route.params.id+'&'+ (new Date()).getTime().toString()).then(res=>{
            console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.fromData=res.data.data[0]
        }).catch(err=>{
            console.log(err);
        })
    },
     methods: {
       handleClick(){
         window.close();
       }
     }
}
</script>

<style scoped>
#notice{
  width: 600px;
  margin: 5px auto;
}
#noticeDeail{
  border: #7f7f7f 2px dotted;
  background: #eff3fb;
}
#noticeDeail h3{
  text-align: center;
}
#noticeDeail div{
  margin: 10px;
}
</style>