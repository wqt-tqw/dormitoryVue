<template>
  <pagehome>
    <div style="margin-bottom: 20px">
      <el-button type="primary" @click="handleAdd()">新增</el-button>
      <el-button type="danger" @click="delAll()">删除</el-button>
    </div>
     <el-table
    v-if="isTure"
    ref="multipleTable"
    :data="tableData"
    border
    tooltip-effect="dark"
    style="min-width: 100%"
    @selection-change="handleSelectionChange">
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
      prop="bedNo"
      label="床位号"
      min-width="120">
    </el-table-column>
    <el-table-column
      prop="roomNo"
      label="房间号"
      min-width="120">
    </el-table-column>
    <el-table-column
      prop="stuNo"
      label="学号"
      min-width="120">
    </el-table-column>
    <el-table-column
      prop="allocationTime"
      label="分配时间"
      min-width="120">
    </el-table-column>
     <el-table-column
        fixed="right"
        label="操作"
        align="center"
        min-min-width="150">
        <template slot-scope="scope">
          <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button
            size="mini"
            type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
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
  <el-dialog :title="title" :visible.sync="dialogFormVisible" :show-close="false"  width="30%" center>
    <el-form :model="form">
      <el-form-item label="学生信息" :label-width="formLabelWidth">
        <el-select style="width: 300px;" v-model="form.stuNo" clearable placeholder="请选择">
          <el-option
            v-for="item in studentdata"
            :key="item.stuNo"
            :label="item.stustr"
            :value="item.stuNo">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房间床位" :label-width="formLabelWidth">
        <el-select style="width: 300px;" v-model="form.bedId" clearable placeholder="请选择">
          <el-option
            v-for="item in roombeddata"
            :key="item.bedId"
            :label="item.roombed"
            :value="item.bedId"
            :disabled="item.whetherPeople==1?true:false">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="handleClose()" >确 定</el-button>
    </div>
  </el-dialog>
  </pagehome>
</template>

<script>
import pagehome from '@/components/pagehome'

export default {
  name:'bedAllocation',
  components: {
      pagehome
    },
    inject: ['reload'],
     data() {
      return {
        isTure:true,
        tableData: [],
        multipleSelection: [],
        title:'',
        type:1,
        dialogFormVisible: false,
        form: {
          stuNo:'',
          bedId: '',
          bedAllocationId:'',
          delivery: false,
        },
        formLabelWidth: '100px',
        currentPage: 1,
        total:0,
        pageSize:10,
        pageNo:1,
        roombeddata:[],
        studentdata:[]
      }
    },
    mounted () {

      // if(this.$store.state.collegelist){
      //   //ajax请求
      //   this.$store.dispatch('selectCollege')
      //       this.tableData=this.$store.state.collegelist.data
      //       this.total=this.$store.state.collegelist.total
      // }else{
      //   console.log('使用缓存数据')
      // }
        this.axios("/dormitoryadmin/selectbedAllocation?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
            console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.tableData=res.data.data
            this.total=res.data.total
            this.roombeddata=res.data.roombeddata
            this.studentdata=res.data.studentdata
        }).catch(err=>{
            console.log(err);
        })
    },

    methods: {
      handleClose(){
        var url=''
        var params = ''
        if(this.type==1){
          url='/dormitoryadmin/addbedAllocation'
          params={
            stuNo: this.form.stuNo,
            bedId: this.form.bedId
          }
        }else if(this.type==2){
          url='/dormitoryadmin/updatebedAllocation'
          params={
            stuNo: this.form.stuNo,
            bedId: this.form.bedId,
            bedAllocationId: this.form.bedAllocationId
          }
        }
        this.axios({
          method: 'post',
          url: url,
          params: params
          // data:{
          //   bedNo: this.form.bedNo,
          //   bedAllocationId: this.form.bedAllocationId
          // }
        }).then((res)=>{
           if(res.data.meta.flag){
             this.dialogFormVisible = false

             this.$message({
              message: `${this.title}成功`,
              type: 'success'
            });

             this.reload()
           }
           
        })
        .catch( (err)=> {
          this.$message.error(`${this.title}失败`);
          console.log(err);
        });
      },
      cancel(){
        this.dialogFormVisible = false
        // this.form={}
        this.form.stuNo=''
        this.form.bedId=''
        this.form.bedAllocationId=''
      },
      handleAdd(){
        this.dialogFormVisible = true
        this.title='新增'
        this.type=1
      },
      // handleEdit(index, row) {
      //   this.dialogFormVisible = true
      //   this.title='编辑'
      //   this.form.stuNo=row.stuNo
      //   this.form.bedId=row.bedId
      //   this.form.bedAllocationId=row.bedAllocationId
      //   this.type=2
      //   console.log(index, row);
      // },
      handleDelete(index, row) {
        console.log(row)
        this.axios("/dormitoryadmin/delbedAllocation?bedAllocationId="+row.bedAllocationId+'&bedId='+row.bedId ).then(res=>{
            if(res.data.meta.flag){
              this.$message({
                message: `删除成功`,
                type: 'success'
              });
              
              this.reload()
              // this.$router.go(0);
              // location.reload() 
            }
        }).catch(err=>{
            this.$message.error(`删除失败`);
            console.log(err);
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },
      delAll() {
        console.log(this.multipleSelection)
        var ids = ''
        this.multipleSelection.forEach(element => {
          ids+=element.bedAllocationId+','
        });
        ids=ids.substring(0,ids.lastIndexOf(','))
        console.log(ids)
        var bedIds = ''
        this.multipleSelection.forEach(element => {
          bedIds+=element.bedId+','
        });
        bedIds=bedIds.substring(0,bedIds.lastIndexOf(','))
        console.log(bedIds)
        this.axios("/dormitoryadmin/delbedAllocation?bedAllocationId="+ids+'&bedId='+bedIds).then(res=>{
            if(res.data.meta.flag){
              this.$message({
                message: `删除成功`,
                type: 'success'
              });
              this.reload()
              // this.$router.go(0);
              // location.reload() 
            }
        }).catch(err=>{
          this.$message.error(`删除失败`);
            console.log(err);
        })
      },
      handleSizeChange(val) {
        this.isTure=false
        this.pageSize = val
        console.log(`每页 ${val} 条`);
        this.axios("/dormitoryadmin/selectbedAllocation?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
            console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.tableData=res.data.data
            this.total=res.data.total
            this.roombeddata=res.data.roombeddata
            this.studentdata=res.data.studentdata
        }).catch(err=>{
            console.log(err);
        })
        this.isTure=true
      },
      handleCurrentChange(val) {
        this.isTure=false
        this.pageNo = val
        console.log(`当前页: ${val}`);
        this.axios("/dormitoryadmin/selectbedAllocation?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
            console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.tableData=res.data.data
            this.total=res.data.total
            this.roombeddata=res.data.roombeddata
            this.studentdata=res.data.studentdata
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