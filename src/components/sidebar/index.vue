<template>
  <div>
        <!-- <el-row class="tac">
        <el-col :span="5"> -->
            <el-menu
            :default-active="$route.path"
            :default-openeds="['1']"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose" 
            background-color="#545c64"
            text-color="#fff"
            router    
            active-text-color="#ffd04b">
                <el-submenu index="1" v-if="$store.state.role=='1'">
                    <template slot="title">
                    <i class="el-icon-s-platform"></i>
                    <span>管理员</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">管理员菜单</template>
                        <el-menu-item index="/superAdmin/college">学院信息管理</el-menu-item>
                        <el-menu-item index="/superAdmin/room">班级信息管理</el-menu-item>
                        <el-menu-item index="/superAdmin/instructor">辅导员信息管理</el-menu-item>
                        <el-menu-item index="/superAdmin/teacher">教师信息管理</el-menu-item>
                        <el-menu-item index="/superAdmin/student">学生列表</el-menu-item>
                        <el-menu-item index="/superAdmin/dormitory">宿舍楼管理</el-menu-item>
                        <el-menu-item index="/superAdmin/dormitoryadmin">宿舍管理员列表</el-menu-item>
                        <el-menu-item index="/superAdmin/notice">公告发布列表</el-menu-item>
                        <el-menu-item index="/superAdmin/messageboard">留言板管理</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="信息统计分析">
                        <el-menu-item index="/superAdmin/bedallocation">床位分配列表</el-menu-item>
                        <el-menu-item index="/superAdmin/dormitoryhygiene">宿舍安全卫生管理列表</el-menu-item>
                        <el-menu-item index="/superAdmin/dormitoryannualranking">宿舍年度排名</el-menu-item>
                        <el-menu-item index="/superAdmin/dormitorypayment">宿舍缴费列表</el-menu-item>
                        <el-menu-item index="/superAdmin/outsiders">各楼外来人员登记列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="1" v-else-if="$store.state.role=='2'">
                    <template slot="title">
                    <i class="el-icon-s-home"></i>
                    <span>宿舍管理员</span>
                    </template>
                    <el-menu-item-group>
                    <template slot="title">宿舍管理员菜单</template>
                        <el-menu-item index="/dormitoryAdmin/room">房间信息管理</el-menu-item>
                        <el-menu-item index="/dormitoryAdmin/bed">床位信息管理</el-menu-item>
                        <el-menu-item index="/dormitoryAdmin/bedAllocation">床位分配</el-menu-item>
                        <el-menu-item index="/dormitoryAdmin/dormitoryhygiene">宿舍安全卫生评分</el-menu-item>
                        <el-menu-item index="/dormitoryAdmin/hotelExpense">交住宿费</el-menu-item>
                        <el-menu-item index="/dormitoryAdmin/outsiders">外来人员登记</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="1" v-else-if="$store.state.role=='3'">
                    <template slot="title">
                    <i class="el-icon-s-custom"></i>
                    <span>教师</span>
                    </template>
                    <el-menu-item-group>
                    <template slot="title">教师管理员菜单</template>
                        <el-menu-item index="/teacher/classInformation">查看班级信息</el-menu-item>
                        <el-menu-item index="/teacher/bedAllocation">查看床位分配</el-menu-item>
                        <el-menu-item index="/teacher/dormitoryhygiene">查看宿舍卫生</el-menu-item>
                        <el-menu-item index="/teacher/hotelExpense">查看宿舍交费</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="1" v-else-if="$store.state.role=='4'">
                    <template slot="title">
                    <i class="el-icon-user"></i>
                    <span>学生</span>
                    </template>
                    <el-menu-item-group>
                    <template slot="title">学生菜单</template>
                        <el-menu-item index="/student/dormitoryAchievement">查看我们宿舍成绩</el-menu-item>
                        <el-menu-item index="/student/myCharge">查看我的收费</el-menu-item>
                        <el-menu-item index="/student/messageBoard">学生留言板</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="1" v-else-if="$store.state.role=='5'">
                    <template slot="title">
                    <i class="el-icon-female"></i>
                    <span>辅导员</span>
                    </template>
                    <el-menu-item-group>
                    <template slot="title">辅导员菜单</template>
                        <el-menu-item index="/instructor/bedAllocation">查看床位分配</el-menu-item>
                        <el-menu-item index="/instructor/dormitoryhygiene">查看宿舍卫生</el-menu-item>
                        <el-menu-item index="/instructor/hotelExpense">查看宿舍交费</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        <!-- </el-col>
        </el-row> -->
  </div>
</template>

<script>
export default {
name:'sidebar',
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
       handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    mounted () {
        this.$store.commit('primarykeyIdMutations',localStorage.getItem('primarykeyId'))
        this.$store.commit('roleMutations',localStorage.getItem('role'))
        this.$store.commit('usernameMutations',localStorage.getItem('username'))
        console.log('role:'+this.$store.state.role)
    }
}
</script>

<style scoped>

</style>