export default{
    path : '/otherInformation',
    component : ()=>import('@/views/otherInformation/loginAgain.vue'),
    children:[
        {
            path:'loginAgain',
            component:()=>import('@/views/otherInformation/loginAgain.vue')
        },
        {
            path:'updateInformation',
            component:()=>import('@/views/otherInformation/updateInformation.vue')
        }
    ]
}