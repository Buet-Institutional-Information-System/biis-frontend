import Vue from 'vue';
import VueRouter from 'vue-router';

import Admin from "@/views/Admin";
import Adviser from "@/views/Adviser";
import Contact from "@/views/Contact";
import EditInfo from "@/views/EditInfo";
import Feedback from "@/views/Feedback";
import Home from "@/views/Home";
import NotFound from "@/views/NotFound";
import Password from "@/views/Password";
import Registration from "@/views/Registration";
import RegistrationApproval from "@/views/RegistrationApproval";
import SecretQuestion from "@/views/SecretQuestion";
import ShowGrade from "@/views/ShowGrade";
import SignIn from '@/views/SignIn.vue';
import ViewGrade from "@/views/ViewGrade";



import store from "@/store";

Vue.use(VueRouter)

const routes = [
    {
      path:'/',
      redirect:'/signIn'
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin
    },
    {
        path: '/adviser',
        name: 'Adviser',
        component: Adviser,
        meta: { requiresAuth: true }
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact,
        meta: { requiresAuth: true }
    },
    {
        path: '/editInfo',
        name: 'EditInfo',
        component: EditInfo,
        meta: { requiresAuth: true }
    },
    {
        path: '/feedback',
        name: 'Feedback',
        component: Feedback,
        meta: { requiresAuth: true }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: '/password',
        name: 'Password',
        component: Password,
        meta: { requiresAuth: true }
    },
    {
        path: '/secretQuestion',
        name: 'SecretQuestion',
        component: SecretQuestion,
        meta: { requiresAuth: true }
    },
    {
        path: '/showGrade',
        name: 'ShowGrade',
        props: true,
        component: ShowGrade,
        meta: { requiresAuth: true }
    },
    {
        path: '/signIn',
        name: 'SignIn',
        component: SignIn,
        meta: { requiresUnauth: true }
    },
    {
        path: '/registration',
        name: 'Registration',
        component: Registration,
        meta: { requiresAuth: true }
    },
    {
        path: '/registrationApproval',
        name: 'RegistrationApproval',
        component: RegistrationApproval,
        meta: { requiresAuth: true }
    },
    {
        path: '/viewGrade',
        name: 'ViewGrade',
        component: ViewGrade,
        meta: { requiresAuth: true }
    },
    {   path: '/:notFound(.*)',
        component: NotFound
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth && store.getters['student/getFlagSignIn']===false && localStorage.getItem('token')===null){
        console.log("router guard: first block");
        console.log("requiresAuth: ",to.meta.requiresAuth);
        console.log("flagSignIn: ",store.getters['student/getFlagSignIn']);
        console.log("localStorageToken: ",localStorage.getItem('token'));
        next('/signIn');
    }
    else if(to.meta.requiresUnauth && (store.getters['student/getFlagSignIn']===true || localStorage.getItem('token')!==null)){
        console.log("router guard: second block");
        console.log("requiresUnauth: ",to.meta.requiresUnauth);
        console.log("flagSignIn: ",store.getters['student/getFlagSignIn']);
        console.log("localStorageToken: ",localStorage.getItem('token'));
        next('/home');
    }
    else{
        console.log("router guard: third block")
        console.log("requiresAuth: ",to.meta.requiresAuth);
        console.log("flagSignIn: ",store.getters['student/getFlagSignIn']);
        console.log("localStorageToken: ",localStorage.getItem('token'));
        next();
    }

});

export default router;
