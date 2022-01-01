export default{
    path : '/student',
    component : ()=>import('@/views'),
    children:[
        //学生菜单
        {
            path:'dormitoryAchievement',
            component:()=>import('@/views/student/dormitoryAchievement.vue')
        },
        {
            path:'myCharge',
            component:()=>import('@/views/student/myCharge.vue')
        },
        {
            path:'messageBoard',
            component:()=>import('@/views/student/messageBoard.vue')
        },
        {
            path:'/student',
            redirect: '/student/dormitoryAchievement'
        },
        {
            path:'/student/*',
            redirect: '/student/dormitoryAchievement'
        }
    ]
}
