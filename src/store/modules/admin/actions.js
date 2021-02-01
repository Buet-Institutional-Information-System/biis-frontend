import router from "@/router";
import axios from 'axios';

export default{
    async adminStudent(context){
        console.log("adminStudent clicked");
        context.rootState.spinnerFlag = true;
        try {
            let response2 = await axios.get('/admin/engDepts');
            let response3 = await axios.get('/admin/terms');
            if (response2.data.length != 0) {
                context.commit('setDeptEngList',response2.data);
                //console.log(this.deptEngList);
            }
            if (response3.data.length != 0) {
                context.commit('setTermList',response3.data);
                //console.log(this.termList);
            }
        } catch (e) {
            console.log("adminStudent catch error: ",e);
        } finally {
            context.rootState.spinnerFlag = false;
        }
    },
    async adminTeacher(context){
        console.log("adminStudent clicked");
        context.rootState.spinnerFlag = true;
        try {
            let response = await axios.get('/admin/depts');
            //console.log(response.data);
            if (response.data.length != 0) {
                context.commit('setDeptList',response.data);
                console.log('adminTeacher deptList from store: ',context.getters.getDeptList);
            }
        } catch (e) {
            console.log("adminTeacher catch error: ",e);
        } finally {
            context.rootState.spinnerFlag = false;
        }
    },
    async adminDeleteStudent(context,payload){
        console.log("adminDeleteStudent clicked");
        context.rootState.spinnerFlag = true;
        try {
            let response = await axios.delete('/admin/student', {data: payload});
            if(response.status===200){
                console.log("adminUpdateGrade response: ",response);
                return "clear";
            }
        } catch (e) {
            console.log("adminDeleteStudent catch error: ",e);
        } finally {
            context.rootState.spinnerFlag = false;
        }
    },
    async adminDeleteTeacher(context,payload){
        console.log("adminDeleteTeacher clicked");
        context.rootState.spinnerFlag = true;
        try {
            let response = await axios.delete('/admin/teacher', {data: payload});
            if(response.status===200){
                console.log("adminUpdateGrade response: ",response);
                return "clear";
            }
        } catch (e) {
            console.log("adminDeleteTeacher catch error: ",e);
        } finally {
            context.rootState.spinnerFlag = false;
        }
    },
    async adminInsertStudent(context,payload){
        console.log("adminStudent clicked");
        context.rootState.spinnerFlag = true;
        console.log('payload in adminInsertStudent: ',payload);
        let formData = new FormData();
        for (let item in payload) {
            formData.append(item, payload[item]);
        }
        console.log('formData in adminInsertStudent: ',formData);
        try {
            let response = await axios.post('/admin/student', formData);
            if(response.status===200){
                console.log("adminInsertStudent response: ",response);
                return "clear";
            }
        } catch (e) {
            console.log("adminInsertStudent catch error: ",e);
        } finally {
            context.rootState.spinnerFlag = false;
        }
    },
    async adminInsertTeacher(context,payload){
        console.log("adminTeacher clicked");
        context.rootState.spinnerFlag = true;
        console.log('payload in adminInsertTeacher: ',payload);
        let formData = new FormData();
        for (let item in payload) {
            formData.append(item, payload[item]);
        }
        console.log('formData in adminInsertStudent: ',formData);
        // console.log(formData.get('id'));
        // console.log(formData.get('name'));
        // console.log(formData.get('dept'));
        // console.log(formData.get('designation'));
        try {
            let response = await axios.post('/admin/teacher', formData);
            if(response.status===200){
                console.log("adminInsertTeacher response: ",response);
                return "clear";
            }
        } catch (e) {
            console.log("adminInsertTeacher catch error: ",e);
        } finally {
            context.rootState.spinnerFlag = false;
        }
    },
    async adminUpdateDesignation(context,payload){
        console.log("adminUpdateDesignation clicked");
        context.rootState.spinnerFlag = true;
        console.log('payload in adminUpdateDesignation: ',payload);
        try {
            let response = await axios.patch('/admin/updateDesignation', payload);
            if(response.status===200){
                console.log("adminUpdateDesignation response: ",response);
                return "clear";
            }
        } catch (e) {
            console.log("adminUpdateDesignation catch error: ",e);
        } finally {
            context.rootState.spinnerFlag = false;
        }
    },
    async adminUpdateGrade(context,payload){
        console.log("adminUpdateGrade clicked");
        context.rootState.spinnerFlag = true;
        console.log('payload in adminUpdateGrade: ',payload);
        try {
            let response = await axios.patch('/admin/updateGrade', payload);
            if(response.status===200){
                console.log("adminUpdateGrade response: ",response);
                return "clear";
            }
        } catch (e) {
            console.log("adminUpdateGrade catch error: ",e);
        } finally {
            context.rootState.spinnerFlag = false;
        }
    },
    async publish(context) {
        console.log("public clicked");
        context.rootState.spinnerFlag = true;
        try {
            let response = await axios.patch('/admin/updatePublish');
            console.log("publish response: ",response);
        } catch (e) {
            console.log("adminUpdateGrade catch error: ",e);
        } finally {
            context.rootState.spinnerFlag = false;
        }
    },
}