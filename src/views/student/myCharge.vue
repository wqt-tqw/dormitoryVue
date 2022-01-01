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
        prop="paymentTime"
        label="交费时间"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="paymentSemester"
        label="交费学期"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="paymentMoney"
        label="交费金额"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="stuNo"
        label="学号"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="stuName"
        label="姓名"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="className"
        label="班级名称"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="collegeName"
        label="学院名称"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="username"
        label="宿舍管理员"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </pagehome>
</template>

<script>
import pagehome from '@/components/pagehome'

export default {
  name:'myCharge',
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
        this.axios("/student/hotelExpenseAllocation"+ (new Date()).getTime().toString()).then(res=>{
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