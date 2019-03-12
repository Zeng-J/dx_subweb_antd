import UserLayout from '../components/UserLayout'

export default [{
    path:'/front',
    name:'login',
    component:UserLayout,
    redirect:'/front/login',
    children:[
        {
            path:'login',
            name:'login',
            component:() => import('./views/login')
        }
    ]

}]