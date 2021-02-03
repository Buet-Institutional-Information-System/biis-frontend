export default{
    setMessageType(state,payload){
        state.messageType=payload;
    },
    setMessage(state,payload){
        state.message=payload;
    },
    resetMessage(state){
        state.messageType=null;
        state.message=null;
    }
}