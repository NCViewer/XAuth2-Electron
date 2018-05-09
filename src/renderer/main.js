import Vue from 'vue';
import axios from 'axios';
import Vuetify from 'vuetify';
import VueAxios from 'vue-axios';
import VueAuthenticate from 'vue-authenticate';
import 'vuetify/dist/vuetify.min.css';

import App from './App';
import store from './store';
import router from './router';

import picker from './utils/DrivePicker';
picker.init();

// Vue Setup
Vue.use(Vuetify);
Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, {
    // baseUrl: 'http://localhost:9080',

    providers: {
        google: {
            clientId: '517541031080-3fvrgh8o7f790ura8g6olba9ecm9075n.apps.googleusercontent.com',
            redirectUri: 'http://api.xauth2.com/api/auth/code',
            scope: ['profile', 'email', 'https://www.googleapis.com/auth/drive']
            // url: 'https://accounts.google.com/o/oauth2/v2/auth',
            // url: 'https://www.googleapis.com/oauth2/v4/token',
            // redirectUri: 'com.xanderluciano.xauth',
            // url: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=',
        },
    },
});

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
// Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>',
}).$mount('#app');
