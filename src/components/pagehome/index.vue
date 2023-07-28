<template>
  <div>
    <el-container style="height: 650px;border: 1px solid #eee">
      <el-aside width="250px" style="background-color: rgb(238, 241, 246)">
        <sidebar></sidebar>
      </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <div @click="edit()">
              <el-dropdown-item>修改</el-dropdown-item>
            </div>
            <div @click="signOut()">
              <el-dropdown-item>退出</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{$store.state.username}}</span>
        <span style="margin-left:10px;cursor: pointer;" @click="chatRoomPush">聊天室</span>
      </el-header>
      
      <el-main>
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
    <el-dialog  :visible.sync="dialogFormVisible" :show-close="false" width="30%" center>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon  label-width="100px" class="demo-ruleForm">
      <el-form-item label="密码" prop="pass" :label-width="formLabelWidth">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" :label-width="formLabelWidth">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="handleClose('ruleForm')" >确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import sidebar from '@/components/sidebar'

export default {
  name:'pagehome',
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
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
        dialogFormVisible: false,
        formLabelWidth: '100px'
      };
    },
  components: {
    sidebar
  },
  methods: {
    chatRoomPush(){
      // this.$router.push('/chatRoom')
      let routeData = this.$router.resolve({
          path: "/chatRoom"
        });
        window.open(routeData.href, '_blank');
    },
    edit(){
      this.dialogFormVisible = true
    },
    handleClose(formName){
       this.$refs[formName].validate((valid) => {
         console.log(valid)
          if (valid) {
            this.axios({
              method: 'post',
              url: '/users/changePassword',
              data:{
                password: this.ruleForm.pass,
                primarykeyId: localStorage.getItem('primarykeyId')
              }
            }).then((res)=>{
              if(res.data.meta.flag){
                this.dialogFormVisible = false

                this.$message({
                  message: `修改成功`,
                  type: 'success'
                });

                this.reload()
              }
              
            })
            .catch( (err)=> {
              this.$message.error(`修改失败`);
              console.log(err);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      cancel(){
        this.dialogFormVisible = false
        this.ruleForm.pass=''
        this.ruleForm.checkPass=''
      },
    signOut(){
      this.$store.commit('roleMutations','')
      this.$store.commit('usernameMutations','')
      this.$store.commit('primarykeyIdMutations','')
      localStorage.setItem('username','')
      localStorage.setItem('role','')
      localStorage.setItem('primarykeyId','')
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>