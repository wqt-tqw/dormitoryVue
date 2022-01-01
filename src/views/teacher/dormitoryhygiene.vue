<template>
  <pagehome>
    <el-table
      v-if="isTure"
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
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total">
      </el-pagination>
    </div>
  </pagehome>
</template>

<script>
import pagehome from '@/components/pagehome'

export default {
  name:'dormitoryhygiene',
  components: {
      pagehome
    },
    data() {
      return {
        isTure:true,
        tableData: [],
        currentPage: 1,
        total:0,
        pageSize:10,
        pageNo:1,
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
        this.axios("/teacher/dormitoryhygieneAllocation?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
            console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.tableData=res.data.data
            this.total=res.data.total
            this.roomData=res.data.roomData
        }).catch(err=>{
            console.log(err);
        })
    },
    methods: {
      handleSizeChange(val) {
        this.isTure=false
        this.pageSize = val
        console.log(`每页 ${val} 条`);
        this.axios("/teacher/dormitoryhygieneAllocation?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
            console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.tableData=res.data.data
            this.total=res.data.total
        }).catch(err=>{
            console.log(err);
        })
        this.isTure=true
      },
      handleCurrentChange(val) {
        this.isTure=false
        this.pageNo = val
        console.log(`当前页: ${val}`);
        this.axios("/teacher/dormitoryhygieneAllocation?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
            console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.tableData=res.data.data
            this.total=res.data.total
        }).catch(err=>{
            console.log(err);
        })
        this.isTure=true
      }
    }
}
</script>

<style scoped>

</style>