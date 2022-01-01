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
      prop="guestName"
      label="来宾名称"
      min-width="120">
    </el-table-column>
    <el-table-column
      prop="guestTime"
      label="到访时间"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="roomNo"
      label="房间号"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="guestContent"
      label="事情内容"
      show-overflow-tooltip>
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
  <el-dialog :title="title" :visible.sync="dialogFormVisible" :show-close="false" width="30%" center>
    <el-form :model="form">
      <el-form-item label="来宾名称" :label-width="formLabelWidth">
        <el-input v-model="form.guestName" autocomplete="off" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="房间" :label-width="formLabelWidth">
        <el-select style="width: 300px;" v-model="form.roomId" clearable placeholder="请选择">
          <el-option
            v-for="item in roomData"
            :key="item.roomId"
            :label="item.roomNo"
            :value="item.roomId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公告内容" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.guestContent" :autosize="{ minRows: 8}" style="width: 300px;"></el-input>
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
  name:'outsiders',
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
          guestName: '',
          roomId: '',
          guestContent:'',
          guestId:'',
          delivery: false,
        },
        formLabelWidth: '100px',
        currentPage: 1,
        total:0,
        pageSize:10,
        pageNo:1,
        roomData:[]
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
        this.axios("/dormitoryadmin/selectoutsiders?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
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
      handleClose(){
        var url=''
        var params = ''
        if(this.type==1){
          url='/dormitoryadmin/addoutsiders'
          params={
            guestName: this.form.guestName,
            roomId: this.form.roomId,
            guestContent: this.form.guestContent
          }
        }else if(this.type==2){
          url='/dormitoryadmin/updateoutsiders'
          params={
            guestName: this.form.guestName,
            guestContent: this.form.guestContent,
            guestId: this.form.guestId
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
        this.form.guestName=''
        this.form.guestContent=''
        this.form.guestId=''
      },
      handleAdd(){
        this.dialogFormVisible = true
        this.title='新增'

        this.type=1
      },
      // handleEdit(index, row) {
      //   this.dialogFormVisible = true
      //   this.title='编辑'
      //   this.form.guestName=row.guestName
      //   this.form.guestTime=row.guestTime
      //   this.form.guestContent=row.guestContent
      //   this.form.guestId=row.guestId
      //   this.type=2
      //   console.log(index, row);
      // },
      handleDelete(index, row) {
        console.log(row)
        this.axios("/dormitoryadmin/deloutsiders?guestId="+row.guestId ).then(res=>{
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
          ids+=element.guestId+','
        });
        ids=ids.substring(0,ids.lastIndexOf(','))
        console.log(ids)
        this.axios("/dormitoryadmin/deloutsiders?guestId="+ids).then(res=>{
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
        this.axios("/dormitoryadmin/selectoutsiders?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
            console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.tableData=res.data.data
            this.total=res.data.total
            this.roomData=res.data.roomData
        }).catch(err=>{
            console.log(err);
        })
        this.isTure=true
      },
      handleCurrentChange(val) {
        this.isTure=false
        this.pageNo = val
        console.log(`当前页: ${val}`);
        this.axios("/dormitoryadmin/selectoutsiders?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
            console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.tableData=res.data.data
            this.total=res.data.total
            this.roomData=res.data.roomData
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