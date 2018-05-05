<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap justify-center="">

            <v-flex xs12 sm8 md6>
                <v-card class="elevation-4">

                    <!-- Card Toolbar -->
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Register</v-toolbar-title>
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
                            <v-text-field prepend-icon="face" v-model="name" name="name" label="Name or Company" type="text"></v-text-field>
                            <v-text-field prepend-icon="person" v-model="email" name="email" label="Email" type="email"></v-text-field>
                            <v-text-field prepend-icon="lock" v-model="password" name="password" label="Password" id="password" type="password"></v-text-field>
                        </v-form>
                    </v-card-text>

                    <!-- Card Action Buttons -->
                    <v-card-actions>
                        <v-btn flat color="primary">Reset Password</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn flat @click="goto('login')">Login</v-btn>
                        <v-btn color="primary" @click="register">Register</v-btn>
                    </v-card-actions>

                </v-card>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'register',
    data() {
        return {
            name: 'Xander',
            email: 'XanderLuciano@G28.io',
            password: 'test123',
        };
    },
    methods: {
        goto(path) {
            this.$router.push(path);
        },

        register() {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then((user) => {
                    console.log(user);
                },
                (error) => {
                    console.log(error.message);
                });
        },
    },
};
</script>
