export default{
    path : '/instructor',
    component : ()=>import('@/views'),
    children:[
        //辅导员菜单
        {
            path:'bedAllocation',
            component:()=>import('@/views/instructor/bedAllocation.vue')
        },
        {
            path:'dormitoryhygiene',
            component:()=>import('@/views/instructor/dormitoryhygiene.vue')
        },
        {
            path:'hotelExpense',
            component:()=>import('@/views/instructor/hotelExpense.vue')
        },
        {
            path:'/instructor',
            redirect: '/instructor/bedAllocation'
        },
        {
            path:'/instructor/*',
            redirect: '/instructor/bedAllocation'
        }
    ]
}
