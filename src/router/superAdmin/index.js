export default{
    path : '/superAdmin',
    component : ()=>import('@/views'),
    children:[
        //管理员菜单
        {
            path:'college',
            component:()=>import('@/views/superAdmin/college.vue')
        },
        {
            path:'room',
            component:()=>import('@/views/superAdmin/room.vue')
        },
        {
            path:'instructor',
            component:()=>import('@/views/superAdmin/instructor.vue')
        },
        {
            path:'teacher',
            component:()=>import('@/views/superAdmin/teacher.vue')
        },
        // {
        //     path:'registerteacher',
        //     component:()=>import('@/views/superAdmin/registerTeacher.vue')
        // },
        {
            path:'student',
            component:()=>import('@/views/superAdmin/student.vue')
        },
        {
            path:'dormitory',
            component:()=>import('@/views/superAdmin/dormitory.vue')
        },
        {
            path:'dormitoryadmin',
            component:()=>import('@/views/superAdmin/dormitoryAdmin.vue')
        },
        {
            path:'notice',
            component:()=>import('@/views/superAdmin/notice.vue')
        },
        {
            path:'messageboard',
            // component:()=>import('@/views/superAdmin/messageBoard.vue')
            component:()=>import('@/views/student/messageBoard.vue')
        },

        //信息统计分析
        {
            path:'bedallocation',
            component:()=>import('@/views/superAdmin/bedAllocation.vue')
        },
        {
            path:'dormitoryhygiene',
            component:()=>import('@/views/superAdmin/dormitoryHygiene.vue')
        },
        {
            path:'dormitoryannualranking',
            component:()=>import('@/views/superAdmin/dormitoryAnnualRanking.vue')
        },
        {
            path:'dormitorypayment',
            component:()=>import('@/views/superAdmin/dormitoryPayment.vue')
        },
        {
            path:'outsiders',
            component:()=>import('@/views/superAdmin/outsiders.vue')
        },

        {
            path:'/superAdmin',
            redirect: '/superAdmin/college'
        },
        {
            path:'/superAdmin/*',
            redirect: '/superAdmin/college'
        }
    ]
}
