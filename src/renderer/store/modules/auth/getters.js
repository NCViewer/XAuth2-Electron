const authenticated = state => state.authenticated;
const user = state => state.user;
const access_token = state => state.access_token;
const id_token = state => state.id_token;

export default {
    authenticated,
    user,
    access_token,
    id_token,
};
