<template>
  <pagehome>
    <div style="margin-bottom: 20px">
      <el-button v-if="!isflag" type="primary" style="float: right;"  @click="handleAdd()">新留言</el-button>
      <!-- <el-button type="danger" @click="delAll()">删除</el-button> -->
      <h2 style="text-align: center;">欢迎使用学生留言管理论坛</h2>
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
      prop="title"
      label="主题标题"
      min-width="120">
    </el-table-column>
    <el-table-column
      prop="stuName"
      label="留言人"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      prop="messageTime"
      label="留言时间"
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
          @click="handleGet(scope.$index, scope.row)">查看</el-button>
          <el-button
            v-if="isflag"
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
      <el-form-item label="主题标题" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="主题内容" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.content" :autosize="{ minRows: 8}" style="width: 300px;"></el-input>
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
  name:'messageBoard',
  components: {
      pagehome
    },
    inject: ['reload'],
     data() {
      return {
        isflag:true,
        isTure:true,
        tableData: [],
        multipleSelection: [],
        title:'',
        type:1,
        dialogFormVisible: false,
        form: {
          title:'',
          content:''
        },
        formLabelWidth: '100px',
        currentPage: 1,
        total:0,
        pageSize:10,
        pageNo:1
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
        this.isflag = this.$store.state.role==1||localStorage.getItem('role')==1
        this.axios("/student/messageBoardSelect?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
            console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.tableData=res.data.data
            this.total=res.data.total
        }).catch(err=>{
            console.log(err);
        })
    },

    methods: {
      handleClose(){
        var data={
          title: this.form.title,
          content: this.form.content,
          stuNo:this.$store.state.primarykeyId
        }
        this.axios({
          method: 'post',
          url: '/student/messageBoardAdd',
          data:data
        }).then((res)=>{
           if(res.data.meta.flag){
             this.dialogFormVisible = false

             this.$message({
              message: `新增成功`,
              type: 'success'
            });

             this.reload()
           }
           
        })
        .catch( (err)=> {
          this.$message.error(`新增失败`);
          console.log(err);
        });
      },
      cancel(){
        this.dialogFormVisible = false
        // this.form={}
        this.form.title=''
        this.form.content=''
      },
      handleGet(index, row) {
        console.log(index, row);
        let routeData = this.$router.resolve({
          path: `/informationreply/${row.themeId}`
        });
        window.open(routeData.href, '_blank');
      },
      handleAdd(){
        this.dialogFormVisible = true
        this.title='新增'

        this.type=1
      },
      handleDelete(index, row) {
        console.log(row)
        if(this.$store.state.role==1||localStorage.getItem('role')==1){
          this.axios("/student/messageBoardDel?themeId="+row.themeId ).then(res=>{
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
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },
      delAll() {
        console.log(this.multipleSelection)
        var ids = []
        this.multipleSelection.forEach(element => {
          ids+=element.themeId+','
        });
        ids=ids.substring(0,ids.lastIndexOf(','))
        console.log(ids)
        this.axios("/student/messageBoardDel?themeId="+ids).then(res=>{
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
        this.axios("/student/messageBoardSelect?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
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
        this.axios("/student/messageBoardSelect?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
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