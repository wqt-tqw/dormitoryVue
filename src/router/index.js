import Vue from 'vue'
import VueRouter from 'vue-router'

import superAdmin from './superAdmin'
import dormitoryAdmin from './dormitoryAdmin'
import teacher from './teacher'
import student from './student'
import instructor from './instructor'
import otherInformation from './otherInformation'

import register from '@/views/register'

import dormitoryAnnualRanking from '@/views/register/dormitoryAnnualRanking.vue'
import noticeDeail from '@/views/register/noticeDeail.vue'
import informationreply from '@/views/register/informationreply.vue'

Vue.use(VueRouter)

const routes = [
  superAdmin,
  dormitoryAdmin,
  teacher,
  student,
  instructor,
  otherInformation,
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/dormitoryAnnualRanking',
    name: 'dormitoryAnnualRanking',
    component: dormitoryAnnualRanking
  },
  {
    path: '/noticeDeail/:id',
    name: 'noticeDeail',
    component: noticeDeail
  },
  {
    path: '/informationreply/:id',
    name: 'informationreply',
    component: informationreply
  },
  {
    path:'*',
    redirect:'/register'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{

  if(to.path!='/register'&&to.path!='/dormitoryAnnualRanking'&&to.name!='noticeDeail'&&to.name!='informationreply'){
    console.log('盘查')
    console.log(to)
    console.log(from)

    // console.log(next)
    if(localStorage.getItem('username')&&localStorage.getItem('role')){
      if(to.path.substring(0,11)=='/superAdmin'&&localStorage.getItem('role')==1){
        next()
      }else if(to.path.substring(0,15)=='/dormitoryAdmin'&&localStorage.getItem('role')==2){
        next()
      }else if(to.path.substring(0,8)=='/teacher'&&localStorage.getItem('role')==3){
        next()
      }else if(to.path.substring(0,8)=='/student'&&localStorage.getItem('role')==4){
        next()
      }else if(to.path.substring(0,11)=='/instructor'&&localStorage.getItem('role')==5){
        next()
      }else{
        if(localStorage.getItem('role')==1){
          next('/superAdmin')
        }else if(localStorage.getItem('role')==2){
          next('/dormitoryAdmin/room')
        }else if(localStorage.getItem('role')==3){
          next('/teacher/classInformation')
        }else if(localStorage.getItem('role')==4){
          next('/student/dormitoryAchievement')
        }else if(localStorage.getItem('role')==5){
          next('/instructor/bedAllocation')
        }
      }
    }else{
      next('/register')
    }
  }else{
    next()
  }
})

export default router
