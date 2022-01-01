<template>
  <pagehome>
    <div style="margin-bottom: 20px">
      <el-select style="width: 300px;" v-model="semester" clearable placeholder="请选择">
            <el-option
              label="2019-2020年1学期"
              value="2019-2020-1">
            </el-option>
            <el-option
              label="2019-2020年2学期"
              value="2019-2020-2">
            </el-option>
            <el-option
              label="2020-2021年1学期"
              value="2020-2021-1">
            </el-option>
            <el-option
              label="2020-2021年2学期"
              value="2020-2021-2">
            </el-option>
          </el-select>
          <div style="margin-left:10px;display: inline-block;">
            <el-button type="primary" @click="search()">统计</el-button>
          </div>
    </div>
    <el-table
      :data="tableData"
      border
      tooltip-effect="dark"
      style="min-width: 100%">
      <el-table-column
        type="selection"
        min-width="55">
      </el-table-column>
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="roomNo"
        label="房间号"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="dormitoryName"
        label="宿舍楼名称"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="avgyearPerformance"
        label="年度平均成绩"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </pagehome>
</template>

<script>
import pagehome from '@/components/pagehome'

export default {
  name:'dormitoryAnnualRanking',
  components: {
      pagehome
    },
    inject: ['reload'],
    data() {
      return {
        tableData: [],
        semester:''
      }
    },
    mounted () {

      // if(this.$store.state.dormitoryAdminlist){
      //   //ajax请求
      //   this.$store.dispatch('selectoutsiders')
      //       this.tableData=this.$store.state.dormitoryAdminlist.data
      //       this.total=this.$store.state.dormitoryAdminlist.total
      // }else{
      //   console.log('使用缓存数据')
      // }
        this.axios("/admin/selectdhTopFive?"+ (new Date()).getTime().toString()).then(res=>{
            console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.tableData=res.data.data
        }).catch(err=>{
            console.log(err);
        })
    },
    methods: {
      search(){
        // this.axios({
        //   method: 'get',
        //   url: '/admin/selectdhTopFive',
        //   params: {semester:this.semester}
        // }).then((res)=>{
        //    if(res.data.meta.flag){
        //      this.tableData=res.data.data
        //      this.$message({
        //       message: `查询成功`,
        //       type: 'success'
        //     });

        //     //  this.reload()
        //     //  this.$router.go(0);
        //     //   location.reload() 
        //     //  this.tableDat a.push({collegeId:res.data.data,collegeName:this.form.collegeName})
        //     //  this.form.collegeName=''
        //    }
           
        // })
        // .catch( (err)=> {
        //   this.$message.error(`${this.title}失败`);
        //   console.log(err);
        // });
      },
    }
}
</script>

<style scoped>

</style>