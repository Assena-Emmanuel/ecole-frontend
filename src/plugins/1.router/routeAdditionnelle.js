export const redirects = [
    {
        path: '/pages/forgot-password',
        name: 'forgot-password',
        component: ()=>import('@/pages/forgot-password.vue')
    },
    {
        path: '/pages/two-steps',
        name: 'authentification-two-step',
        component: ()=>import('@/pages/two-steps-v1.vue')
    },
    {
        path: '/pages/reset-password',
        name: 'authentification-reset-password',
        component: ()=>import('@/pages/reset-password-v1.vue')
    },
]


export const routes = [

    {
      path: '/apps/user/list',
      name: 'apps-user-list',
      component:()=>import('@/pages/apps/user/list/index.vue'),
      
    },
]
