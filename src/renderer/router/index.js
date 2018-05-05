import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'landing-page',
            component: require('@/components/LandingPage').default,
        },
        {
            path: '/login',
            name: 'login',
            component: require('@/components/Login').default,
        },
        {
            path: '/register',
            name: 'register',
            component: require('@/components/Register').default,
        },
        {
            path: '/onboard',
            name: 'onboard',
            component: require('@/components/Onboard').default,
        },
        {
            path: '/oauth2callback',
            name: 'oauth2-callback',
            component: require('@/components/OAuth2/Callback').default,
        },
        {
            path: '/auth/{service}}',
            component: { template: '<div>Returning to G28.io</div>' },
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
});
