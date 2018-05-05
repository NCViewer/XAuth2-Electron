<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>

            <v-flex xs12 class="my-2">
                <v-data-table
                    :headers="headers"
                    :items="items"
                    hide-actions
                    class="elevation-1">
                    
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-left">{{ props.item.name }}</td>
                        <td class="text-xs-right">{{ props.item.email }}</td>
                        <td class="text-xs-right">{{ props.item.service }}</td>
                        <td class="text-xs-right">{{ props.item.id }}</td>
                    </template>
                    <template slot='footer'>
                        <td colspan="100%">
                            <strong>This is your user info.</strong>
                        </td>
                    </template>

                </v-data-table>
                
            </v-flex>
    
            <v-flex xs12 sm6>
                <v-card dark color="secondary">
                    <v-card-title primary-title class="pb-1">
                        <div class="headline">Recent Files</div>
                    </v-card-title>

                    <div class="px-0">
                        <v-progress-linear :indeterminate="true" height="2" class="my-0"></v-progress-linear>
                    </div>

                    <v-card-text>
                        <div>Waiting for file...</div>
                    </v-card-text>
                </v-card>
            </v-flex>
    
             <v-flex xs12 sm6>
                <v-card dark color="secondary">
                    <v-card-text class="px-0">More Data Goes Here</v-card-text>
                </v-card>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'landing-page',
    data() {
        return {
            headers: [
                {
                    text: 'Name',
                    value: 'name',
                    align: 'left',
                    sortable: true,
                },
                {
                    text: 'Email',
                    value: 'acctType',
                    align: 'right',
                },
                {
                    text: 'Service',
                    value: 'iron',
                    align: 'right',
                },
                {
                    text: 'Unique ID',
                    value: 'iron',
                    align: 'right',
                },
            ],
            items: [
                {
                    name: 'Xander Luciano',
                    email: 'xander.luciano@g28.io',
                    service: 'Google',
                    id: '1234567890',
                },
            ],
        };
    },
    methods: {
        open(link) {
            this.$electron.shell.openExternal(link);
        },
    },
};
</script>
