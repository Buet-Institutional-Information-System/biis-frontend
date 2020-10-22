import Vue from 'vue'
import VueRouter from 'vue-router'
import Adviser from "../views/Adviser";
import Contact from "../views/Contact";
import EditInfo from "../views/EditInfo";
import Feedback from "../views/Feedback";
import Home from "../views/Home";
import Password from "../views/Password";
import SecretQuestion from "../views/SecretQuestion";
import SignIn from '../components/SignIn.vue';
import ViewGrade from "../views/ViewGrade";
import Registration from "../views/Registration";
import RegistrationApproval from "../views/RegistrationApproval";
import ShowGrade from "../views/ShowGrade";
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/adviser',
    name: 'Adviser',
    component: Adviser
  },
    {
      path: '/contact',
      name: 'Contact',
      component:Contact
    },
    {
      path: '/editInfo',
      name: 'EditInfo',
      component:EditInfo
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: Feedback
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/password',
      name: 'Password',
      component: Password
    },
    {
      path: '/secretQuestion',
      name: 'SecretQuestion',
      component: SecretQuestion
    },
    {
      path: '/viewGrade',
      name: 'ViewGrade',
      component:ViewGrade
    },
    {
      path:'/registration',
      name:'Registration',
      component:Registration
    },
    {
      path:'/registrationApproval',
      name:'RegistrationApproval',
      component:RegistrationApproval
    },
    {
      path:'/showGrade',
      name:'ShowGrade',
      component:ShowGrade
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
