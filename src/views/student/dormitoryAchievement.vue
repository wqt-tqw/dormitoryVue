<template>
  <pagehome>
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
        prop="compareTime"
        label="评比时间"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="semester"
        label="学期"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="weekTimes"
        label="周次"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="roomNo"
        label="房间号"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="dormitoryName"
        label="宿舍楼名称"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="username"
        label="宿舍管理员"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="safetyPerformance"
        label="安全成绩"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="healthPerformance"
        label="卫生成绩"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="avgPerformance"
        label="平均成绩"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </pagehome>
</template>

<script>
import pagehome from '@/components/pagehome'

export default {
  name:'dormitoryAchievement',
  components: {
      pagehome
    },
    data() {
      return {
        tableData: []
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
        this.axios("/student/dormitoryhygieneAllocation?"+ (new Date()).getTime().toString()).then(res=>{
            console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.tableData=res.data.data
        }).catch(err=>{
            console.log(err);
        })
    }
}
</script>

<style scoped>

</style>