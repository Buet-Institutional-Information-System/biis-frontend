import router from "@/router";
import axios from 'axios';

export default {
    async adviser(context) {
        context.commit('setSpinnerFlag');
        console.log("adviser clicked");
        let sendObject = {
            id: context.getters.getAdviserId,
            token: context.getters.getToken
        };
        console.log("adviser sendObject: ", sendObject);
        try {
            let response = await axios.get('/adviserInfo', {params: sendObject});
            console.log("adviser response: ");
            console.log(response.data.rows[0]);
            if (response.data.rows.length != 0) {
                let payload = {
                    name: response.data.rows[0].INS_NAME,
                    designation: response.data.rows[0].DESIGNATION,
                    dept: response.data.rows[0].DEPT
                }
                context.commit('setAdviserInfo', payload);
            } else {
                console.log('adviser: response.data.rows.length=0');
            }
        } catch (e) {
            console.log("adviser catch error: ", e);
        } finally {
            context.commit('unsetSpinnerFlag');
        }
    },
    async contact(context) {
        context.commit('setSpinnerFlag');
        console.log("contact clicked");

        let sendObject = {
            token: context.getters.getToken
        };
        console.log("contact sendObject: ", sendObject);
        try {
            let response = await axios.get('/contactInfo', {params: sendObject});
            console.log("contact response: ", response.data.rows[0]);

            if (response.data.rows.length != 0) {
                let payload = {
                    phone: response.data.rows[0].MOBILE_NUMBER,
                    email: response.data.rows[0].EMAIL,
                    contact_person_name: response.data.rows[0].CONTACT_PERSON_NAME,
                    contact_person_number: response.data.rows[0].CONTACT_PERSON_NUMBER,
                    address: response.data.rows[0].ADDRESS
                };
                context.commit('unsetUserInfo');
                context.commit('setUserInfo', payload);
                //console.log('userinfo in contact phone number: ',context.getters.getPhone);
            } else {
                console.log('contact: response.data.rows.length=0');
            }
        } catch (e) {
            console.log("contact catch error: ", e);
        } finally {
            context.commit('unsetSpinnerFlag');
        }
    },
    async editConfirmClicked(context, payload) {
        context.commit('student/setSpinnerFlag');
        console.log("editConfirm clicked");
        console.log("payload from editInfo: ", payload);
        let sendObject = {
            token: context.getters.getToken,
            phone: payload['Phone No'],
            email: payload['Email'],
            contact_person_name: payload['Contact Person Name'],
            contact_person_number: payload['Contact Person Phone'],
            address: payload['Residential Area']
        };
        console.log('editConfirm sendObject: ', sendObject);
        try {
            console.log("inside try");
            let response = await axios.patch('/editInfo', sendObject);
            console.log("editConfirm response: ");
            console.log(response);
        } catch (e) {
            console.log("editConfirm catch error: ", e);
        } finally {
            context.commit('student/unsetSpinnerFlag');
            await context.dispatch('gotoContact');
        }
    },
    async logOutClicked(context) {
        console.log("logOut clicked");
        let sendObject = {
            token: context.getters.getToken
        }
        console.log("logOut sendObject: ", sendObject);
        context.commit('unsetUser');
        context.commit('unsetUserInfo');
        context.commit('unsetAdviserInfo');
        localStorage.removeItem("token");
        await router.push('/signIn');
        let response = await axios.post('/logOut', sendObject);
        console.log("logOut response: ", response);
    },
    async passwordChange(context, payload) {
        context.commit('setSpinnerFlag');
        console.log("passwordChange clicked");
        let sendObject = {
            ...payload,
            token: context.getters.getToken,
        };
        console.log("passwordChange sendObject: ", sendObject);
        try {
            let response = await axios.patch('/password', sendObject);
            console.log("passwordChange response: ");
            console.log(response.data);
            await context.dispatch('gotoHome');
        } catch (e) {
            console.log("passwordChange catch error: ", e);
        } finally {
            context.commit('unsetSpinnerFlag');
        }
    },
    async registration(context) {
        console.log("registration clicked");
        context.commit('setSpinnerFlag');
        let sendObject = {
            token: context.getters.getToken,
            term_id: context.getters.getUserTerm,
            available_dept: context.getters.getUserDeptId
        };
        console.log('registration sendObject: ', sendObject);
        try {
            let response = await axios.get('/registration', {params: sendObject});
            console.log("registration response: ", response.data);
            if (response.data.registration && response.data.rows.length !== 0) {
                context.commit('setTotalCreditHours', {total_credit_hours: response.data.total_credit_hour});
                console.log("registration total_credit_hours from store: ", context.getters.getTotalCreditHours);
                response.data.rows.forEach(row => row['select'] = false);
                context.commit('setCourses', response.data.rows);
                console.log("registration courses from store: ", context.getters.getCourses);
            } else if (!response.data.registration) {
                //console.log("registration redirect to registrationApproval");
                await context.dispatch('gotoRegistrationApproval');
            } else {
                console.log('registration else block');
            }
        } catch (e) {
            console.log("registration catch error: ", e);
        } finally {
            context.commit('unsetSpinnerFlag');
        }
    },
    async registrationApproval(context) {
        console.log("registrationApproval clicked");
        context.commit('setSpinnerFlag');
        let sendObject = {
            token: context.getters.getToken,
            term_id: context.getters.getUserTerm
        };
        console.log("registrationApproval sendObject: ",sendObject);
        try {
            let response = await axios.get('/registrationApproval', {params: sendObject});
            console.log("registrationApproval respons data: ", response.data);
            console.log("registrationApproval response.data.registered_credit_hours: ",response.data.registered_credit_hours);
            console.log("registrationApproval response.data.credit_hours_earned: ",response.data.credit_hours_earned);
            context.commit('setRegisteredCreditHours',{registered_credit_hours:response.data.registered_credit_hours});
            context.commit('setCreditHoursEarnedUptoThisTerm',{credit_hours_earned_upto_this_term:response.data.credit_hours_earned});
            if (response.data.registered_credit_hours=== null) {
                context.commit('setRegisteredCreditHours',{registered_credit_hours:0});
            }
            if (response.data.credit_hours_earned=== null) {
                context.commit('setCreditHoursEarnedUptoThisTerm',{credit_hours_earned_upto_this_term:0})
            }
            if (response.data.rows.length !== 0) {
                context.commit('setCourses', response.data.rows);
            } else {
                console.log('registrationApproval else block');
            }
            console.log("registrationApproval registered_credit_hours from store: ",context.getters.getRegisteredCreditHours);
            console.log("registrationApproval credit_hours_earned_upto_this_term from store: ",context.getters.getCreditHoursEarnedUptoThisTerm);
        } catch (e) {
            console.log("registrationApproval catch error: ", e);
        } finally {
            context.commit('unsetSpinnerFlag');
        }
    },
    async registrationSubmitClicked(context, payload) {
        console.log("registrationSubmitClicked ");
        context.commit('setSpinnerFlag');
        console.log("payload from registration: ", payload);
        let sendObject = {
            token: context.getters.getToken,
            term_id: context.getters.getUserTerm,
            course_id: []
        };

        payload.forEach(c => {
            if (c['select'] === true) {
                sendObject.course_id.push(c['COURSE_ID']);
            }
        });
        console.log("registrationSubmitClicked sendObject", sendObject);

        try {
            let response = await axios.post('/insertRegistration', sendObject);
            console.log("insertRegistration response: ", response);
            await context.dispatch('gotoRegistrationApproval');
        } catch (e) {
            console.log("registrationSubmitClicked catch error: ", e);
        } finally {
            context.commit('unsetSpinnerFlag');
        }
    },
    gotoEditInfo() {
        router.push('/editInfo');
    },
    gotoHome() {
        router.push('/home');
    },
    gotoContact() {
        router.push('/contact');
    },
    gotoRegistrationApproval() {
        router.push('/registrationApproval');
    }
}