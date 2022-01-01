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
      prop="noticeTheme"
      label="公告主题"
      min-width="120">
    </el-table-column>
    <el-table-column
      prop="noticeTime"
      label="公告时间"
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
      <el-form-item label="公告主题" :label-width="formLabelWidth">
        <el-input v-model="form.noticeTheme" autocomplete="off" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="公告时间" :label-width="formLabelWidth">
        <el-date-picker
          style="width: 300px;"
            v-model="form.noticeTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="公告内容" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.noticeContent" :autosize="{ minRows: 8}" style="width: 300px;"></el-input>
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
  name:'notice',
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
          noticeTheme: '',
          noticeTime:'',
          noticeContent:'',
          noticeId:'',
          delivery: false,
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
        this.axios("/admin/selectnotice?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
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
        var url=''
        var params = ''
        if(this.type==1){
          url='/admin/addnotice'
          params={
            noticeTheme: this.form.noticeTheme,
            noticeTime: this.renderTime(this.form.noticeTime),
            noticeContent: this.form.noticeContent
          }
        }else if(this.type==2){
          url='/admin/updatenotice'
          params={
            noticeTheme: this.form.noticeTheme,
            noticeTime: this.renderTime(this.form.noticeTime),
            noticeContent: this.form.noticeContent,
            noticeId: this.form.noticeId
          }
        }
        this.axios({
          method: 'post',
          url: url,
          // params: params
          data:params
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
        this.form.noticeTheme=''
        this.form.noticeTime=''
        this.form.noticeContent=''
        this.form.noticeId=''
      },
      handleAdd(){
        this.dialogFormVisible = true
        this.title='新增'

        this.type=1
      },
      handleEdit(index, row) {
        this.dialogFormVisible = true
        this.title='编辑'
        this.form.noticeTheme=row.noticeTheme
        this.form.noticeTime=row.noticeTime
        this.form.noticeContent=row.noticeContent
        this.form.noticeId=row.noticeId
        this.type=2
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(row)
        this.axios("/admin/delnotice?noticeId="+row.noticeId ).then(res=>{
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
          ids+=element.noticeId+','
        });
        ids=ids.substring(0,ids.lastIndexOf(','))
        console.log(ids)
        this.axios("/admin/delnotice?noticeId="+ids).then(res=>{
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
        this.axios("/admin/selectnotice?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
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
        this.axios("/admin/selectnotice?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
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