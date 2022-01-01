export default{
    path : '/dormitoryAdmin',
    component : ()=>import('@/views'),
    children:[
        //宿舍管理员菜单
        {
            path:'room',
            component:()=>import('@/views/dormitoryAdmin/room.vue')
        },
        {
            path:'bed',
            component:()=>import('@/views/dormitoryAdmin/bed.vue')
        },
        {
            path:'bedAllocation',
            component:()=>import('@/views/dormitoryAdmin/bedAllocation.vue')
        },
        {
            path:'dormitoryhygiene',
            component:()=>import('@/views/dormitoryAdmin/dormitoryhygiene.vue')
        },
        {
            path:'hotelExpense',
            component:()=>import('@/views/dormitoryAdmin/hotelExpense.vue')
        },
        {
            path:'outsiders',
            component:()=>import('@/views/dormitoryAdmin/outsiders.vue')
        },
        {
            path:'/dormitoryAdmin',
            redirect: '/dormitoryAdmin/room'
        },
        {
            path:'/dormitoryAdmin/*',
            redirect: '/dormitoryAdmin/room'
        }
    ]
}
