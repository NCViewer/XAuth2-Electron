import actions from './actions';
import getters from './getters';
import mutations from './mutations';


const state = {
    authenticated: false,
    access_token: null,
    id_token: null,
    user: {
        uid: null,
        name: '',
        email: '',
        avatar: '',   
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
