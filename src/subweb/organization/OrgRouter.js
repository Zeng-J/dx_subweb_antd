import BasicLayout from '../components/BasicLayout'

export default [{
    path:'/org',
    name:'org',
    meta:{title:'组织管理'},
    component:BasicLayout,
    redirect:'org/list',
    children:[
        {
            path:'list',
            name:'list',
            meta:{title:'组织管理'},
            component:() => import('./views/Org')
        }
    ]

}]