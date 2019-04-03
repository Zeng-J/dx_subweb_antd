import BasicLayout from '../components/BasicLayout'

export default [{
    path:'/front',
    name:'front',
    component:BasicLayout,
    meta:{title:'首页'},
    redirect:'/front/index',
    children:[
        {
            path:'login',
            name:'login',
            meta:{title:'登陆'},
            component:() => import('./views/Login')
        },
        {
            path:'index',
            meta:{title:'首页'},
            name:'index',
            component:() => import('./views/Index')
        },
        {
            path:'register',
            meta:{title:'注册'},
            name:'register',
            component:() => import('./views/Register')
        }
    ]

}]