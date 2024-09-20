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
    {
        path: '/pages/login',
        name: 'login-page',
        component: ()=>import('@/pages/login.vue').catch(err => console.error(err))
    },
]


export const routes = [
    {
      path: '/apps/user/list',
      name: 'apps-user-list',
      component:()=>import('@/pages/apps/user/list/index.vue'),
      
    },
]
