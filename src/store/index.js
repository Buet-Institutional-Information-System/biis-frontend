import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flagSignIn:false,
    userId:"",
    termId:"",
    deptId:"",
    userName:"",
    userPassword:"",
    dept: "",
    currentLevel:"",
    currentTerm:"",
    currentSession:"",
    hallName:"",
    hallStatus:"",
    contact_person_name:"",
    contact_person_number:"",
    adviserId:"",
    adviserName:"",
    adviserDesignation: "",
    phone:"",
    email:"",
    address:"",
    spinnerFlag:false,
    registration:false
  },
  getters: {
    getFlagSignIn: state =>{
      return state.flagSignIn;
    },
    getUserId:state=>{
      return  state.userId;
    },
    getUserTerm:state=>{
      return  state.termId;
    },
    getUserDeptId:state=>{
      return  state.deptId;
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
      return state.currentSession;
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
    getContactPersonName:state=>{
      return state.contact_person_name;
    },
    getContactPersonNumber:state=>{
      return state.contact_person_number;
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
      state.termId=payload.term_id;
      state.deptId=payload.dept_id;
      state.userPassword=payload.password;
      state.userName=payload.name;
      state.currentLevel=payload.level;
      state.currentTerm=payload.term;
      state.currentSession=payload.session;
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
      state.contact_person_name=payload.contact_person_name;
      state.contact_person_number=payload.contact_person_number;
      state.address=payload.address;
    },
    unsetUserInfo(state){
      state.phone="";
      state.contact_person_name="";
      state.contact_person_number="";
      state.address="";
    },
    setSpinnerFlag(state){
      state.spinnerFlag=true;
    },
    unsetSpinnerFlag(state){
      state.spinnerFlag=false;
    },
    setRegistration(state){
      state.registration=true;
    },
    unsetRegistration(state){
      state.registration=false;
    }
  },
  modules: {
  }
})
