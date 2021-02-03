export default{
    async setNotificationTimer(context){
         setTimeout(()=>{
            context.commit('resetMessage');
        },2000)
    },
    resetNotification(context){
       context.commit('resetMessage');
    }
}