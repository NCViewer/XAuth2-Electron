<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap justify-center>

            <v-flex xs12 sm8 md6>
                <v-card class="elevation-4">

                    <!-- Card Toolbar -->
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Login</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-tooltip bottom>
                            <v-btn
                            icon
                            :href="'/'"
                            target="_blank"
                            slot="activator"
                            >
                                <v-icon>code</v-icon>
                            </v-btn>
                            <span>Source</span>
                        </v-tooltip>
                    </v-toolbar>
                    
                    <!-- Card Body -->
                    <v-card-text>
                        <v-form>
                            <v-text-field prepend-icon="person" v-model="email" name="email" label="Email" type="email"></v-text-field>
                            <v-text-field prepend-icon="lock" v-model="password" name="password" label="Password" id="password" type="password"></v-text-field>
                        </v-form>
                    </v-card-text>

                    <!-- Card Action Buttons -->
                    <v-card-actions>
                        <v-btn flat color="primary">Reset Password</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn flat @click="goto('register')">Register</v-btn>
                        <v-btn color="primary" @click="loginPw">Login</v-btn>
                    </v-card-actions>

                </v-card>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
import firebase from 'firebase';


/* eslint-disable no-unused-vars, prefer-const, no-trailing-spaces */
export default {
    name: 'login',
    data() {
        return {
            email: 'Xander.Luciano@G28.io',
            password: 'test123',
        };
    },
    methods: {
        goto(path) {
            this.$router.push(path);
        },

        changeName(name) {
            let user = firebase.auth().currentUser;

            if (!user) return;

            user.updateProfile({
                displayName: name,
            }).then(() => {
                console.log('Successfully updated Name');
            }).catch(() => {
                console.log('Shit went wrong yo.');
            });
        },

        login() {
            const provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then((result) => {
                let token = result.credential.accessToken;
                let user = result.user;
                console.log(user);
            }).catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                let email = error.email;
                let credential = error.credential;
                console.log(errorMessage);
            });
        },

        loginRedirect() {
            const provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithRedirect(provider);

            firebase.auth().getRedirectResult().then((authData) => {
                console.log(authData);
            }).catch((error) => {
                console.log(error);
            });
        },

        loginPw() {
            firebase.auth().signOut();

            firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log(errorMessage);
            });

            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in.
                    console.log('Signed In');
                    console.log(user);
                } else {
                    // No user is signed in.
                    console.log('Signed Out');
                }
            });
        },
    },
};
</script>
