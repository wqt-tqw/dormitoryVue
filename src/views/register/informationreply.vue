<template>
  <div id="notice">
    <div id="noticeDeail">
      <h3>{{fromData.title}}</h3>
      <p>学生：{{fromData.stuName}}</p>
      <p>主题内容:{{fromData.content}}</p>
      <p>留言时间：{{fromData.messageTime}}</p>
      <div style="text-align: center;margin: 20px;">
        <p style="font-size: 20px;">回复内容</p>
        <el-table
          v-if="isTure"
          ref="multipleTable"
          :data="tableData"
          border
          tooltip-effect="dark"
          style="min-width: 100%"
          @selection-change="handleSelectionChange">
          <!-- <el-table-column
            type="selection"
            min-width="55">
          </el-table-column> -->
          <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="stuNo"
            label="回复人"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="replyContent"
            label="回复内容"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="replyTime"
            label="回复时间"
            show-overflow-tooltip>
          </el-table-column>
          <!-- <el-table-column
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
            </el-table-column> -->
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
        <!-- <div style="margin-bottom: 20px">
          <el-button type="primary" @click="handleAdd()">新增</el-button>
          <el-button type="danger" @click="delAll()">删除</el-button>
        </div> -->
        <div style="text-align: center;margin-top: 20px;">
          <el-button v-if="!isflag" type="info" @click="handleRelease()">发表回复</el-button>
          <el-button type="info" @click="handleClick()">关闭</el-button>
        </div>
        <el-dialog :title="title" :visible.sync="dialogFormVisible" :show-close="false" width="30%" center>
          <el-form :model="form">
            <el-form-item label="主题内容" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form.replyContent" :autosize="{ minRows: 8}" style="width: 300px;"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel()">取 消</el-button>
            <el-button type="primary" @click="handleClose()" >确 定</el-button>
          </div>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'informationreply',
  inject: ['reload'],
    data() {
    return {
      isflag:true,
      isTure:true,
      fromData:[],
      tableData: [],
      multipleSelection: [],
      title:'',
      type:1,
      dialogFormVisible: false,
      form: {
        replyContent: '',
        // delivery: false,
      },
      formLabelWidth: '100px',
      currentPage: 1,
      total:0,
      pageSize:10,
      pageNo:1
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
      this.isflag = this.$store.state.role==1||localStorage.getItem('role')==1
      this.axios("/student/messageBoardGetId?themeId="+this.$route.params.id+'&'+ (new Date()).getTime().toString()).then(res=>{
            console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.fromData=res.data.data[0]
        }).catch(err=>{
            console.log(err);
        })
        this.axios("/student/informationreplySelect?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&themeId='+this.$route.params.id+'&'+ (new Date()).getTime().toString()).then(res=>{
            console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.tableData=res.data.data
            this.total=res.data.total
        }).catch(err=>{
            console.log(err);
        })
  },

  methods: {
    handleRelease(){
      this.dialogFormVisible = true
    },
    handleClick(){
      window.close();
    },
    handleClose(){
         var data={
          replyContent:this.form.replyContent,
          themeId:this.$route.params.id,
          stuNo:this.$store.state.primarykeyId||localStorage.getItem('primarykeyId')
        }

        // return
        this.axios({
          method: 'post',
          url: '/student/informationreplyAdd',
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
        this.form.replyContent=''
      },
    // handleAdd(){
    //   this.dialogFormVisible = true
    //   this.title='新增'
    //   this.form.collegeName=''
    //   this.form.collegeId=''
    //   this.type=1
    // },
    // handleEdit(index, row) {
    //   this.dialogFormVisible = true
    //   this.title='编辑'
    //   this.form.collegeName=row.collegeName
    //   this.form.collegeId=row.collegeId
    //   this.type=2
    //   console.log(index, row);
    // },
    handleDelete(index, row) {
      console.log(row)
      this.axios("/admin/delcollege?collegeId="+row.collegeId ).then(res=>{
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
        ids+=element.collegeId+','
      });
      ids=ids.substring(0,ids.lastIndexOf(','))
      console.log(ids)
      this.axios("/admin/delcollege?collegeId="+ids).then(res=>{
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
      this.axios("/student/informationreplySelect?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&themeId='+this.$route.params.id+'&'+ (new Date()).getTime().toString()).then(res=>{
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
      this.axios("/student/informationreplySelect?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&themeId='+this.$route.params.id+'&'+ (new Date()).getTime().toString()).then(res=>{
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
#notice{
  width: 1000px;
  margin: 5px auto;
}
#noticeDeail{
  border: #7f7f7f 2px dotted;
  background: #eff3fb;
  width: 100%;
}
#noticeDeail h3{
  text-align: center;
}
#noticeDeail p{
  margin: 10px;
}
</style>