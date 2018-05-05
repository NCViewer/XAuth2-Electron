<template>
<v-container>
    <v-layout justify-center>
        <v-flex xs12 md10 lg8>
            <v-stepper v-model="stepper">
                    <v-stepper-header>
                        <template v-for="(step, index) in steps">
                            <v-stepper-step
                                :key='`step-${index}`'
                                :edit-icon="'check'"
                                :complete-icon="'edit'"
                                :step="index + 1"
                                :complete="(index + 1 ) <= stepper"
                                :editable="(index + 1) < stepper">{{ step.label }}</v-stepper-step>
                            <v-divider :key=index v-if="index !== (steps.length - 1)"></v-divider>
                        </template>
                    </v-stepper-header>

                    <v-stepper-items>

                        <!-- Step 1 - Basic Info -->
                        <v-stepper-content step="1">
                            <v-form>
                                <v-text-field prepend-icon="face" name="name" label="Name" type="text"></v-text-field>
                                <v-text-field prepend-icon="business" name="company" label="Company" type="text"></v-text-field>
                                <v-text-field prepend-icon="person" name="email" label="Email" type="email"></v-text-field>
                            </v-form>
                            <v-layout justify-end>
                                <v-btn flat @click.native="stepper = 1">Back</v-btn>
                                <v-btn color="primary" @click.native="stepper = 2">Continue</v-btn>
                            </v-layout>
                        </v-stepper-content>

                        <!-- Step 2 - Login Details -->
                        <v-stepper-content step="2">
                            <v-form>
                                <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                                <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                            </v-form>
                            <v-layout justify-end>
                                <v-spacer></v-spacer>
                                <v-btn flat @click.native="stepper = 1">Back</v-btn>
                                <v-btn color="primary" @click.native="stepper = 3">Continue</v-btn>
                            </v-layout>
                        </v-stepper-content>
                        
                        <!-- Step 3 - Shop Properties -->
                        <v-stepper-content step="3">
                            <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                            <v-layout justify-end>
                                <v-spacer></v-spacer>
                                <v-btn flat @click.native="stepper = 2">Back</v-btn>
                                <v-btn color="primary" @click.native="stepper = 1">Continue</v-btn>
                            </v-layout>
                        </v-stepper-content>

                    </v-stepper-items>
            </v-stepper>
        </v-flex>
    </v-layout>
</v-container>
</template>


<script>
export default {
    name: 'onboard',
    data() {
        return {
            stepper: 0,
            steps: [
                {
                    label: 'Basic Info',
                    completed: false,
                },
                {
                    label: 'Login Details',
                    completed: false,
                },
                {
                    label: 'Shop Properties',
                    completed: false,
                },
            ],
        };
    },
    methods: {
        goto(path) {
            this.$router.push(path);
        },
    },
    computed: {
    },
};
</script>
