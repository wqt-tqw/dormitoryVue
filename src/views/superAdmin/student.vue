<template>
  <pagehome>
    <div style="margin-bottom: 20px">
      <el-button type="primary" @click="handleAdd()">新增</el-button>
      <el-button type="danger" @click="delAll()">删除</el-button>
    </div>
    <el-table
    v-if="isTure"
    :data="filterSearch"
    border
    tooltip-effect="dark"
    style="min-width: 100%"
    @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        min-width="55">
      </el-table-column>
      <el-table-column
        label="学号"
        prop="stuNo">
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="stuName">
      </el-table-column>
      <el-table-column
        label="性别"
        prop="sex">
      </el-table-column>
      <el-table-column
        label="入学时间"
        prop="admissionTime">
      </el-table-column>
      <el-table-column
        label="班级名称"
        prop="className">
      </el-table-column>
      <el-table-column
        align="center">
        <template slot="header" slot-scope="{}">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
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
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.stuName" style="width: 300px;"> autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.sex" clearable style="width: 300px;" placeholder="请选择">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入学时间" :label-width="formLabelWidth">
          <el-date-picker
          style="width: 300px;"
            v-model="form.admissionTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="班级名称" :label-width="formLabelWidth">
          <el-select style="width: 300px;" v-model="form.classId" clearable placeholder="请选择">
            <el-option
              v-for="item in classdata"
              :key="item.classId"
              :label="item.className"
              :value="item.classId">
            </el-option>
          </el-select>
        </el-form-item>
        <p style="text-align: center;color:red">学生默认密码为：student</p>
        <el-upload
          style="text-align: center;"
          class="upload-demo"
          action="/ajax/upload"
          :data = "uploadObj"
          :before-upload="beforeAvatarUpload"
          :on-preview = "handlePreview"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
        </el-upload>
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
  name:'student',
  components: {
      pagehome
    },
    data() {
      return {
        uploadObj:{module:'stu'},
        isTure:true,
        tableData: [],
        multipleSelection: [],
        search: '',
        currentPage: 1,
        total:0,
        pageSize:10,
        pageNo:1,
        title:'',
        type:1,
        dialogFormVisible: false,
        form: {
          stuNo: '',
          stuName:'',
          sex: '',
          admissionTime: '',
          classId:'',
          photo:'',
          delivery: false,
        },
        formLabelWidth: '100px',
        classdata:[],
        fileList: []
      
        // fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      }
    },
    inject: ['reload'],
    mounted () {
        this.axios("/admin/selectUser?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
            // console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.tableData=res.data.data
            this.total=res.data.total
            this.classdata=res.data.classdata
        }).catch(err=>{
            console.log(err);
        })
    },
    methods: {
       beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        const isJPG = file.type.indexOf('image');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (isJPG) {
          this.$message.error('上传头像图片只能是图片格式!');
          return false
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false
        }
        return isJPG && isLt2M;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        var photos =''
        fileList.forEach(function(item){
           photos += (item.id?item.id:item.response&&item.response.enclosureId)+','
        })
        this.form.photo = photos
      },
      handleChange(file, fileList) {
        console.log(file, fileList);
        var photos =''
        fileList.forEach(function(item){
           photos += (item.id?item.id:item.response&&item.response.enclosureId)+','
        })
        this.form.photo = photos
      },
      handlePreview(file) {
        console.log(file);
        window.open(file.url)
      },
      handleClose(){
        var url=''
        var data = {
          stuName: this.form.stuName,
          collegeId: this.form.collegeId,
          sex: this.form.sex,
          admissionTime: this.renderTime(this.form.admissionTime),
          classId: this.form.classId,
          photo: this.form.photo&&this.form.photo.substring(0,this.form.photo.lastIndexOf(','))
        }
        if(this.type==1){
          url='/admin/addUser'
        }else if(this.type==2){
          url='/admin/updateUser'
          data.stuNo = this.form.stuNo
        }
        this.axios({
          method: 'post',
          url: url,
          data:data
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
        this.form.stuName=''
        this.form.sex=''
        this.form.admissionTime=''
        this.form.classId=''

        this.fileList = []
      },
      handleAdd(){
        this.dialogFormVisible = true
        this.title='新增'
        this.form={}
        this.type=1
      },
      handleEdit(index, row) {
        this.fileList = []
        this.dialogFormVisible = true
        this.title='编辑'
        this.form.stuNo=row.stuNo
        this.form.stuName=row.stuName
        this.form.sex=row.sex
        this.form.admissionTime=row.admissionTime
        this.form.classId=row.classId

        if(row.enclosurelist){
          row.enclosurelist.forEach((item)=>{
            this.fileList.push({id:item.enclosureId,name:item.enclosureName,url:item.enclosureUrl})
          })
        }
      
        this.type=2
        console.log(index, row);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },
      handleDelete(index, row) {
        console.log(row)
        this.axios("/admin/delUser?stuNo="+row.stuNo).then(res=>{
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
      delAll() {
        console.log(this.multipleSelection)
        var ids = []
        this.multipleSelection.forEach(element => {
          ids+=element.stuNo+','
        });
        ids=ids.substring(0,ids.lastIndexOf(','))
        console.log(ids)
        this.axios("/admin/delUser?stuNo="+ids).then(res=>{
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
        this.axios("/admin/selectUser?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
            console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.tableData=res.data.data
            this.total=res.data.total
            this.classdata=res.data.classdata
        }).catch(err=>{
            console.log(err);
        })
        this.isTure=true
      },
      handleCurrentChange(val) {
        this.isTure=false
        this.pageNo = val
        console.log(`当前页: ${val}`);
        this.axios("/admin/selectUser?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
            console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.tableData=res.data.data
            this.total=res.data.total
            this.classdata=res.data.classdata
        }).catch(err=>{
            console.log(err);
        })
        this.isTure=true
      }
    },
    computed:{
      filterSearch(){
        return this.tableData.filter(data => {
          if(!this.search){
            return !this.search
          }else if(data.stuName.toLowerCase().includes(this.search.toLowerCase())){
            return data.stuName.toLowerCase().includes(this.search.toLowerCase())
          }
        })
      }
    }
}
</script>

<style scoped>

</style>