import BasicLayout from '../components/BasicLayout'

export default [{
    path:'/team',
    name:'team',
    meta:{title:'团队管理'},
    component:BasicLayout,
    redirect:'team/member',
    children:[
        {
            path:'member',
            meta:{title:'团队成员'},
            name:'member',
            component:() => import('./views/Members')
        },
        {
            path:'role',
            name:'role',
            meta:{title:'团队角色'},
            component:() => import('./views/Roles')
        },
        {
            path:'group',
            name:'group',
            meta:{title:'团队群组'},
            component:() => import('./views/Groups'),
            children:[
                {
                    path:'member',
                    name:'member',
                    meta:{title:'成员列表'},
                    component:() => import('./views/GroupMembers')
                },
                {
                    path:'relation',
                    name:'relation',
                    meta:{title:'成员关联'},
                    component:() => import('./views/GroupRelation')
                },
            ]
        }
    ]

}]