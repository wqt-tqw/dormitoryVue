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
      prop="className"
      label="班级名称"
      min-width="120">
    </el-table-column>
    <el-table-column
      prop="collegeName"
      label="所属学院"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
        fixed="right"
        label="操作"
        align="center"
        min-min-width="150">
        <template slot-scope="scope">
          <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
  <el-dialog :title="title" :visible.sync="dialogFormVisible" :show-close="false" width="30%" center>
    <el-form :model="form">
      <el-form-item label="所属学院" :label-width="formLabelWidth">
        <el-select style="width: 300px;" v-model="form.collegeId" clearable placeholder="请选择">
          <el-option
            v-for="item in collegedata"
            :key="item.collegeId"
            :label="item.collegeName"
            :value="item.collegeId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级名称" :label-width="formLabelWidth">
        <el-input v-model="form.className" autocomplete="off" style="width: 300px;"></el-input>
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
  name:'room',
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
          collegeId: '',
          className:'',
          classId:'',
          delivery: false,
        },
        formLabelWidth: '100px',
        currentPage: 1,
        total:0,
        pageSize:10,
        pageNo:1,
        collegedata:[]
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
        this.axios("/admin/selectclass?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
            console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.tableData=res.data.data
            this.total=res.data.total
            this.collegedata=res.data.collegedata
        }).catch(err=>{
            console.log(err);
        })
    },

    methods: {
      handleClose(){
        var url=''
        var params = ''
        if(this.type==1){
          url='/admin/addclass'
          params={
            collegeId: this.form.collegeId,
            className: this.form.className
          }
        }else if(this.type==2){
          url='/admin/updateclass'
          params={
            collegeId: this.form.collegeId,
            className: this.form.className,
            classId: this.form.classId
          }
        }
        this.axios({
          method: 'post',
          url: url,
          params: params
          // data:{
          //   className: this.form.className,
          //   classId: this.form.classId
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
        this.form.collegeId=''
        this.form.className=''
        this.form.classId=''
      },
      handleAdd(){
        this.dialogFormVisible = true
        this.title='新增'
        this.type=1
      },
      handleEdit(index, row) {
        this.dialogFormVisible = true
        this.title='编辑'
        this.form.collegeId=row.collegeId
        this.form.className=row.className
        this.form.classId=row.classId
        this.type=2
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(row)
        this.axios("/admin/delclass?classId="+row.classId ).then(res=>{
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
        var ids = []
        this.multipleSelection.forEach(element => {
          ids+=element.classId+','
        });
        ids=ids.substring(0,ids.lastIndexOf(','))
        console.log(ids)
        this.axios("/admin/delclass?classId="+ids).then(res=>{
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
        this.axios("/admin/selectclass?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
            console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.tableData=res.data.data
            this.total=res.data.total
            this.collegedata=res.data.collegedata
        }).catch(err=>{
            console.log(err);
        })
        this.isTure=true
      },
      handleCurrentChange(val) {
        this.isTure=false
        this.pageNo = val
        console.log(`当前页: ${val}`);
        this.axios("/admin/selectclass?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
            console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.tableData=res.data.data
            this.total=res.data.total
            this.collegedata=res.data.collegedata
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