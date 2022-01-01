<template>
  <div id="register">
    <div id="notice">
      <div class="notice-top">
        <font color="#009966">宿舍公告信息</font>
      </div>
      <div class="notice-bottom amin">
        <div v-for="item in tableData" :key="item.noticeId" style="margin: 5px 10px;">
          <a :href="`/noticeDeail/${item.noticeId}`" target="blank">{{item.noticeTheme}}--{{item.noticeTime}}</a>
        </div>
         <!-- <el-carousel :interval="4000" direction="vertical"  type="card" height="200px"> -->
          <!-- <el-carousel-item  v-for="item in tableData" :key="item.noticeId" style="margin: 5px 10px;width:280px"> -->
            <!-- <div class="medium"> -->
              <!-- <a :href="`/noticeDeail/${item.noticeId}`" target="blank">{{item.noticeTheme}}--{{item.noticeTime}}</a> -->
            <!-- </div> -->
            <!-- <h3 class="medium">{{ item }}</h3> -->
          <!-- </el-carousel-item> -->
        <!-- </el-carousel> -->
      </div>
    </div>
    <p style="text-align: center;font-size: 30px;">登录</p>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色" prop="role">
          <el-select v-model="ruleForm.role" placeholder="请选择角色">
            <el-option label="管理员" value="1"></el-option>
            <el-option label="宿舍管理员" value="2"></el-option>
            <el-option label="教师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
            <el-option label="辅导员" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="info" @click="blank()">宿舍成绩排名</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
name:'register',
 data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        ruleForm: {
          role: '',
          username: '',
          password: ''
        },
        rules: {
          role: [
            { required: true, message: '请选择角色', trigger: 'change' }
          ],
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
          ],
          password: [
            {required: true, validator: validatePass, trigger: 'blur' }
          ]
        },
        tableData:[]
      };
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
        this.axios("/admin/selectnotice?"+ (new Date()).getTime().toString()).then(res=>{
            console.log(res)
            console.log(res.data)//axios自动包装data属性 res.data
            this.tableData=res.data.data
        }).catch(err=>{
            console.log(err);
        })
    },
    methods: {
      submitForm(formName) {
        var that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
              method: 'get',
              url: '/users/register',
              params: this.ruleForm
            })
            .then((res)=>{
              console.log(res.data)
              if(res.data.data){
                that.$store.commit('roleMutations',that.ruleForm.role)
                that.$store.commit('usernameMutations',that.ruleForm.username)
                that.$store.commit('primarykeyIdMutations',res.data.data.primarykeyId)
                localStorage.setItem('role',that.ruleForm.role)
                localStorage.setItem('username',that.ruleForm.username)
                localStorage.setItem('primarykeyId',res.data.data.primarykeyId)
                console.log(this)
                if(that.ruleForm.role==1){
                  that.$router.push('/superAdmin')
                }else if(that.ruleForm.role==2){
                  that.$router.push('/dormitoryAdmin/room')
                }else if(that.ruleForm.role==3){
                  that.$router.push('/teacher/classInformation')
                }else if(that.ruleForm.role==4){
                  that.$router.push('/student/dormitoryAchievement')
                }else if(that.ruleForm.role==5){
                  that.$router.push('/instructor/bedAllocation')
                }
                
              }
            })
            .catch((err)=>{
              console.log(err)
            })
            console.log(this.ruleForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      blank(){
        let routeData = this.$router.resolve({
          path: "/dormitoryAnnualRanking"
        });
        window.open(routeData.href, '_blank');
        // window.location.href='/dormitoryAnnualRanking'
        // this.$router.push('/dormitoryAnnualRanking')
      }
    }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
body{
  width: 100%;
  position: relative;
}
#register{
  width: 400px;
  height: 200px;
  position: absolute;
  left: 50%;
  top: 40%;
  margin-left: -200px;
  margin-top: -100px;
}
#notice{
  width: 300px;
  height: 300px;
  border: 1px solid gray;
  position: fixed;
  left: 100px;
  top: 100px;
  background: #f3f3f3;
  overflow: hidden;
}
.notice-top{
  width: 100%;
  height: 40px;
  background: #ff9d1d;
  text-align: center;
  line-height: 40px;
}
.notice-bottom{
  width: 100%;
  height: 250px;
  margin-top: 10px;
  position:relative;
}

</style>