import UserLayout from '../components/UserLayout'

export default [{
    path:'/front',
    name:'front',
    component:UserLayout,
    redirect:'/front/login',
    children:[
        {
            path:'login',
            name:'login',
            component:() => import('./views/Login')
        },
        {
            path:'register',
            name:'register',
            component:() => import('./views/Register')
        }
    ]

}]