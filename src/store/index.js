import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flagSignIn:false,
    userId:"",
    userName:"",
    userPassword:"",
    dept: "",
    currentLevel:"",
    currentTerm:"",
    currentSession:"",
    hallName:"",
    hallStatus:"",
    bankAccountNo:"",
    adviserId:"",
    adviserName:"",
    adviserDesignation: "",
    phone:"",
    email:"",
    address:"",
    spinnerFlag:false,
  },
  getters: {
    getFlagSignIn: state =>{
      return state.flagSignIn;
    },
    getUserId:state=>{
      return  state.userId;
    },
    getUserName:state=>{
      return state.userName;
    },
    getUserPassword:state=>{
      return state.userPassword;
    },
    getUserPhoneNo:state=>{
      return state.userPhoneNo;
    },
    getUserEmailAddress:state=>{
      return state.userEmailAddress;
    },
    getDept:state=>{
      return state.dept;
    },
    getCurrentLevel:state=>{
      return state.currentLevel;
    },
    getCurrentTerm:state=>{
      return state.currentTerm;
    },
    getCurrentSession:state=>{
      return state.currentSession+"-"+(state.currentSession+1);
    },
    getHallName:state=>{
      return state.hallName;
    },
    getHallStatus:state=>{
      return state.hallStatus;
    },
    getBankAccountNo:state=>{
      return state.bankAccountNo;
    },
    getAdviserId:state=>{
      return state.adviserId;
    },
    getPhone:state=>{
      return state.phone;
    },
    getEmail:state=>{
      return state.email;
    },
    getAddress:state=>{
      return state.address;
    },
    getUserImage:state=>{
      return 'http://localhost:1148/student/'+state.userId+'.jpg';
    },
    getAdviserImage:state=>{
      return 'http://localhost:1148/adviser/'+state.adviserId+'.jpg';
    },
    getSpinnerFlag:state=>{
      return state.spinnerFlag;
    }
  },
  mutations: {
    setUser(state,payload){
      state.flagSignIn=true;
      state.userId=payload.id;
      state.userPassword=payload.password;
      state.userName=payload.name;
      state.currentLevel=payload.level;
      state.currentTerm=payload.term;
      state.currentSession=payload.session;
      state.bankAccountNo=payload.bankAccount;
      state.hallName=payload.hallName;
      state.hallStatus=payload.hallStatus;
      state.dept=payload.dept;
      state.adviserId=payload.adviserId;
      console.log(state.flagSignIn);
    },
    unsetUser(state){
      state.flagSignIn=false;
      state.userId="";
      state.userPassword="";
      state.userName="";
      state.currentLevel="";
      state.currentTerm="";
      state.currentSession="";
      state.bankAccountNo="";
      state.hallName="";
      state.hallStatus="";
      state.dept="";
      state.adviserId="";
    },
    setUserPassword(state,password){
      state.password=password;
    },
    setUserInfo(state,payload){
      state.phone=payload.phone;
      state.email=payload.email;
      state.address=payload.address;
    },
    unsetUserInfo(state){
      state.phone="";
      state.email="";
      state.address="";
    },
    setSpinnerFlag(state){
      state.spinnerFlag=true;
    },
    unsetSpinnerFlag(state){
      state.spinnerFlag=false;
    }
  },
  modules: {
  }
})
