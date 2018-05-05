const SET_TOKENS = (state, { access_token, id_token }) => {
    state.access_token = access_token;
    state.id_token = id_token;
};

const SET_USER = (state, { user }) => {
    state.user = user;  
};

const SET_AUTHENTICATED = (state, authStatus) => {
    state.authenticated = authStatus;
};

export default {
    SET_TOKENS,
    SET_USER,
    SET_AUTHENTICATED,
}
