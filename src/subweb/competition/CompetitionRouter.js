import BasicLayout from '../components/BasicLayout'

export default [
    {
        path: '/competition',
        name:'competition',
        meta:{title:'竞赛活动'},
        component:BasicLayout,
        redirect:'competition/list',
        children:[
            {
                path:'list',
                name:'list',
                meta:{title:'竞赛列表'},
                component: () => import('./views/Competition') ,
            },
            {
                path:'message',
                name:'message',
                meta:{title:'竞赛详情'},
                component: () => import('./views/Message') ,
                redirect:'message/details',
                children:[
                    {
                        path:'details',
                        name:'details',
                        meta:{title:'竞赛详情'},
                        component: () => import('./components/Details') ,
                    },
                    {
                        path:'allEvents',
                        name:'allEvents',
                        meta:{title:'全部赛况'},
                        component: () => import('./components/AllEvents') ,
                    },
                    {
                        path:'myEvent',
                        name:'myEvent',
                        meta:{title:'我的赛况'},
                        component: () => import('./components/MyEvent') ,
                    },
                    {
                        path:'enrol',
                        name:'enrol',
                        meta:{title:'报名填表'},
                        component: () => import('./components/Enrol') ,
                    }
                ]
            }
        ]
    }
]