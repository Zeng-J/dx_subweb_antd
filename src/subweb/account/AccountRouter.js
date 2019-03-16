import Index from "./views/Index"

export default [
    {
        path: 'account',
        name:'account',
        meta:{title:'个人信息'},
        component:Index,
        redirect:'account/baseSettings',
        children:[
            {
                path:'baseSettings',
                name:'baseSettings',
                meta:{title:'基本设置'},
                component: () => import('./views/BaseSetting') ,
            },
            {
                path:'securitySettings',
                name:'securitySettings',
                meta:{title:'安全设置'},
                component: () => import('./views/Security') ,
            },
            {
                path:'bindingSettings',
                name:'bindingSettings',
                meta:{title:'账户绑定'},
                component: () => import('./views/Binding') ,
            },
            {
                path:'notificationSettings',
                name:'notificationSettings',
                meta:{title:'新消息通知'},
                component: () => import('./views/Notification') ,
            },
        ]
    },
]