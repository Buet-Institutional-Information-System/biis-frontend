export default{
    async setNotificationTimer(context){
         setTimeout(()=>{
            context.commit('resetMessage');
        },4000)
    },
    resetNotification(context){
       context.commit('resetMessage');
    }
}