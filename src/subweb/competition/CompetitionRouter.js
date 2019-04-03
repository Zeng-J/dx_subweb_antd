import Competition from './views/Competition'

export default [
    {
        path: 'competition',
        name:'competition',
        meta:{title:'竞赛活动'},
        component:Competition
    },
    {
        path:'gameContent',
        name:'gameContent',
        meta:{title:'竞赛详情'},
        component: () => import('./views/GameContent') ,
        redirect:'gameContent/details',
        children:[
            {
                path:'details',
                name:'details',
                meta:{title:'竞赛详情'},
                component: () => import('./components/gameContents/Details') ,
            },
            {
                path:'allEvents',
                name:'allEvents',
                meta:{title:'全部赛况'},
                component: () => import('./components/gameContents/AllEvents') ,
            },
            {
                path:'myEvent',
                name:'myEvent',
                meta:{title:'我的赛况'},
                component: () => import('./components/gameContents/MyEvent') ,
            },
            {
                path:'enrol',
                name:'enrol',
                meta:{title:'报名填表'},
                component: () => import('./components/gameContents/Enrol') ,
            },
            {
                path:'test',
                name:'test',
                meta:{title:'进入答题'},
                component: () => import('./components/gameContents/Test') ,
            }
        ]
    }
]