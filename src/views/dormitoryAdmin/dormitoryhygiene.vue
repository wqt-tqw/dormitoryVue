<template>
  <pagehome>
    <el-container class="container">
      <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="学期">
          <el-select style="width: 300px;" v-model="ruleForm.semester" clearable placeholder="请选择">
            <el-option
              label="2019-2020年1学期"
              value="2019-2020-1">
            </el-option>
            <el-option
              label="2019-2020年2学期"
              value="2019-2020-2">
            </el-option>
            <el-option
              label="2020-2021年1学期"
              value="2020-2021-1">
            </el-option>
            <el-option
              label="2020-2021年2学期"
              value="2020-2021-2">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="周次">
          <el-select style="width: 300px;" v-model="ruleForm.weekTimes" clearable placeholder="请选择">
            <el-option
              v-for="item in 15"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间">
          <el-select style="width: 300px;" v-model="ruleForm.roomId" clearable placeholder="请选择">
            <el-option
              v-for="item in roomData"
              :key="item.roomId"
              :label="item.roomNo"
              :value="item.roomId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="安全成绩">
          <el-input v-model="ruleForm.safetyPerformance"></el-input>
        </el-form-item>
        <el-form-item label="卫生成绩">
          <el-input v-model="ruleForm.healthPerformance"></el-input>
        </el-form-item>
        <p style="text-align: center;color:red">注：仔细核对信息 评分后不能修改！</p>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">评分</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </pagehome>
</template>

<script>
import pagehome from '@/components/pagehome'

export default {
  name:'dormitoryhygiene',
  components: {
      pagehome
    },
    inject: ['reload'],
     data() {
      return {
        ruleForm: {
          semester: '',
          weekTimes: '',
          roomId: '',
          safetyPerformance: '',
          healthPerformance: '',
          hygieneId: ''
        },
        currentPage: 1,
        total:0,
        pageSize:10,
        pageNo:1,
        roomData:[]
      };
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
        this.axios("/dormitoryadmin/selectdormitoryhygiene?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.axios({
            method: 'post',
            url: '/dormitoryadmin/adddormitoryhygiene',
            data:this.ruleForm
          }).then((res)=>{
            if(res.data.meta.flag){
              this.$message({
                message: `提交成功`,
                type: 'success'
              });

              this.reload()
            }
            
          })
          .catch( (err)=> {
            this.$message.error(`${this.title}失败`);
            console.log(err);
          });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style scoped>
.container{
  width: 600px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 40%;
  margin-left: -200px;
  margin-top: -100px;
}
</style>