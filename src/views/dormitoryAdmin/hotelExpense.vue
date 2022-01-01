<template>
  <pagehome>
    <el-container class="container">
      <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="学期">
          <el-select style="width: 300px;" v-model="ruleForm.paymentSemester" clearable placeholder="请选择">
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
        <el-form-item label="交费金额">
          <el-input v-model.number="ruleForm.paymentMoney"></el-input>
        </el-form-item>
        <el-form-item label="学生">
          <el-select style="width: 300px;" v-model="ruleForm.stuNo" clearable placeholder="请选择">
            <el-option
              v-for="item in studentdata"
              :key="item.stuNo"
              :label="item.stustr"
              :value="item.stuNo">
            </el-option>
          </el-select>
        </el-form-item>
        <p style="text-align: center;color:red">注：仔细核对信息 交费后不能修改！</p>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">交费</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </pagehome>
</template>

<script>
import pagehome from '@/components/pagehome'

export default {
  name:'hotelExpense',
  components: {
      pagehome
    },
    inject: ['reload'],
     data() {
      return {
        ruleForm: {
          paymentSemester: '',
          paymentMoney: '',
          stuNo: '',
          dormitoryPaymentId: ''
        },
        currentPage: 1,
        total:0,
        pageSize:10,
        pageNo:1,
        roomData:[],
        studentdata:[]
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
        this.axios("/dormitoryadmin/selectdormitorypayment?pageSize="+this.pageSize+'&pageNo='+this.pageNo+'&'+ (new Date()).getTime().toString()).then(res=>{
            console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.tableData=res.data.data
            this.total=res.data.total
            this.studentdata=res.data.studentdata
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
            url: '/dormitoryadmin/adddormitorypayment',
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