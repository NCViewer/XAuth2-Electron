<template>
    <div id="app">
        <v-app id="inspire" :dark="darkMode">
            <v-navigation-drawer
                fixed
                app
                :clipped="$vuetify.breakpoint.mdAndUp"
                v-model="drawer">

                <v-list dense>

                    <v-list-tile avatar class="mt-2">
                        <v-list-tile-action>
                            <v-flex
                                text-xs-center
                                layout
                                align-center
                                justify-start>
                                <v-avatar :size='36' v-if="authenticated">
                                    <img :src="user.avatar" :alt="user.name">
                                </v-avatar>
                                <v-avatar :size="36" class="teal" v-else>
                                    <v-icon dark>account_circle</v-icon>
                                </v-avatar>
                            </v-flex>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ user.name ? user.name : 'Sign in Below' }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ user.email ? user.email : `...or else I won't like you` }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-divider class="my-2"></v-divider>

                    <v-list-tile @click="logout">
                        <v-list-tile-action>
                            <v-icon>{{ authenticated ? 'phonelink_erase' : 'fingerprint' }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ authenticated ? 'Log Out' : 'Log In' }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-divider class="my-2"></v-divider>

                    <v-list-tile @click="goto('landing-page')">
                        <v-list-tile-action>
                            <v-icon>home</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Home</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile @click="goto('onboard')">
                        <v-list-tile-action>
                            <v-icon>format_list_numbered</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Onboard</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-divider class="my-2"></v-divider>

                    <v-list-tile @click="goto('login')">
                        <v-list-tile-action>
                            <v-icon>verified_user</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Login</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile @click="goto('register')">
                        <v-list-tile-action>
                            <v-icon>person_add</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Register</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-divider class="my-2"></v-divider>

                    <v-list-tile @click="getUser">
                        <v-list-tile-action>
                            <v-icon>refresh</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Refresh Account Data</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile @click="authenticate('google')">
                        <v-list-tile-action>
                            <v-icon>account_circle</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Sign in with Google (Implicit Grant)</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile @click="openPicker" :disable="!authenticated">
                        <v-list-tile-action>
                            <v-icon>cloud_circle</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Open Google Drive</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-list-group>
                        <v-list-tile slot="activator">
                            <v-list-tile-action>
                                <v-icon>settings</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Settings</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile class="align-items-center" href="javascript:;">
                            <v-list-tile-action>
                                <v-switch v-model="darkMode"></v-switch>
                            </v-list-tile-action>
                            <v-list-tile-content @click="darkMode = !darkMode">
                                <v-list-tile-title>Dark Mode</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                    
                </v-list>
            </v-navigation-drawer>

            <v-toolbar
                app
                dark
                :clipped-left="$vuetify.breakpoint.mdAndUp"
                color='primary'>

                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <v-toolbar-title @click.stop="drawer = !drawer">G28.io - XAuth2 RESTful Client</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>apps</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>more_vert</v-icon>
                </v-btn>
            </v-toolbar>

            <v-content fluid>
                <router-view></router-view>
            </v-content>

        </v-app>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import picker from './utils/DrivePicker';

/* eslint-disable no-unused-vars, prefer-const, no-trailing-spaces */
export default {
    name: 'G28Account',

    data() {
        return {
            drawer: true,
            darkMode: false,
            user: {
                email: '',
                name: '',
                avatar: '',
            },
        };
    },

    methods: {
        ...mapMutations({
            setAuthenticated: 'auth/SET_AUTHENTICATED',
            setTokens: 'auth/SET_TOKENS',
        }),

        goto(path) {
            this.$router.push(path);
        },

        // Very pooly coded proof of concepts

        openPicker() {
            if (!this.$auth.isAuthenticated()) {
                picker.setToken(null);
                return;
            }
            
            picker.setToken(this.access_token);

            if (picker.ready) {
                picker.open();
            } else {
                console.log(`Somehow, the picker didn't load.`);
            }
        },

        authenticate(provider) {
            this.$auth.authenticate(provider).then(() => {
                console.log('OAuth2 login was successfull!');

                let access_token = this.$auth.getToken();
                let id_token = this.$auth.getIdToken();

                this.setTokens( { access_token: access_token, id_token: id_token } );
                this.setAuthenticated(true);

                this.getUser();

            }).catch((e) => console.log(e));
        },

        getUser() {
            if (!this.$auth.isAuthenticated()) {
                console.log('No user logged in!');
                
                this.setTokens( { access_token: null, id_token: null } );
                this.setAuthenticated(false);
                
                return;

            } else if (this.$auth.isAuthenticated()) {
                if (!this.access_token || !this.id_token) {
                    console.log('Not logged in.');
                    return;
                }

                console.log('Currently logged in!');
                console.log({
                    access_token: this.access_token,
                    id_token: this.id_token,
                });
                
                this.setAuthenticated(true);

                this.$http.get('https://www.googleapis.com/oauth2/v3/tokeninfo/', {
                    params: { id_token: this.id_token, },
                }).then((id_info) => this.getUserCallback(id_info));
            } else {
                console.log(`Don't know what third option exists, but you found it.`);
            }
        },

        getUserCallback(result) {
            let data = result.data;

            this.user.email = data.email || '';
            this.user.name = data.name || '';
            this.user.avatar = data.picture || '';
            this.user.uid = data.sub || '';
        },

        checkLogin() {
            let state = !!this.$auth.isAuthenticated();
            console.log(this.$auth.isAuthenticated());

            if (state) {
                picker.setToken(this.access_token);
                this.getUser();
            }
            
            if (!this.authenticated) {
                this.user = {
                    name: '',
                    email: '',
                    avatar: '',
                    uid: '',
                }
                picker.setToken(null);
            }
            // Return login state
            return this.authenticated;
        },

        logout() {
            if (!this.authenticated) {
                this.authenticate('google');
                return;
            }

            this.setTokens( { access_token: null, id_token: null } );
            this.setAuthenticated(false);
            this.$auth.logout();
            picker.setToken(null);

            this.user = {
                name: '',
                email: '',
                avatar: '',
                uid: '',
            }
        },
    },

    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            access_token: 'auth/access_token',
            id_token: 'auth/id_token',
        }),
    },

    mounted() {
        this.checkLogin();
    },
};
</script>

<style lang='scss'>
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');

    body { font-family: 'Source Sans Pro', sans-serif; }
</style>
