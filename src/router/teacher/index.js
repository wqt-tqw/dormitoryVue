export default{
    path : '/teacher',
    component : ()=>import('@/views'),
    children:[
        //教师菜单
        {
            path:'classInformation',
            component:()=>import('@/views/teacher/classInformation.vue')
        },
        {
            path:'bedAllocation',
            component:()=>import('@/views/teacher/bedAllocation.vue')
        },
        {
            path:'dormitoryhygiene',
            component:()=>import('@/views/teacher/dormitoryhygiene.vue')
        },
        {
            path:'hotelExpense',
            component:()=>import('@/views/teacher/hotelExpense.vue')
        },
        {
            path:'/teacher',
            redirect: '/teacher/classInformation'
        },
        {
            path:'/teacher/*',
            redirect: '/teacher/classInformation'
        }
    ]
}
