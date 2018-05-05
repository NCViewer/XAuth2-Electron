/* eslint-disable */
// ES LINT IS FUCKING ANNOYING SOMETIMES.

// Google API stuff
const devKey = 'AIzaSyC0vWj-QlZ5EeGkMRroDK_cIxonrC8uwGA';
const clientId = '517541031080-3fvrgh8o7f790ura8g6olba9ecm9075n.apps.googleusercontent.com';
const scope = 'https://www.googleapis.com/auth/drive profile';
// const AppId = '';

class DrivePicker {
    constructor() {
        this.auth2Ready = false;
        this.pickerReady = false;
        this.ready = false;
        this.token = null;
    }

    open() {
        if (!this.token) {
            // this.authUser();
            console.log('Error! - Not Logged in.');
            return false;
        } else {
            this.createPicker();
        }
    }

    init() {
        gapi.load('auth2', () => this.onAuthApiLoad());
        gapi.load('picker', () => this.onPickerApiLoad());
    }

    onAuthApiLoad() {
        this.auth2Ready = true;
        this.ready = this.auth2Ready && this.pickerReady;
        console.log('API Ready');
    }

    onPickerApiLoad() {
        this.pickerReady = true;
        this.ready = this.auth2Ready && this.pickerReady;
        console.log('Picker Ready');
    }

    authUser() {
        gapi.auth2.authorize({
            client_id: clientId,
            scope: scope,
        }, (result) => this.handleAuthResult(result));
    }

    setToken(token) {
        this.token = token;
    }

    handleAuthResult(authResult) {
        console.log('Got Auth Result');
        console.log(authResult);

        if (authResult && !authResult.error) {
            this.token = authResult.access_token;
            this.createPicker();
        }
    }

    createPicker() {
        console.log('Creating Picker');

        if (this.pickerReady && this.token) {
            let docView = new google.picker.DocsView().setIncludeFolders(true).setMode(google.picker.DocsViewMode.LIST);
            let docUpload = new google.picker.DocsUploadView().setIncludeFolders(true);

            let picker = new google.picker.PickerBuilder()
                // .enableFeature(google.picker.Feature.NAV_HIDDEN)
                // .hideTitleBar()
                .addView(docView)
                .addView(docUpload)
                .enableFeature(google.picker.Feature.SUPPORT_TEAM_DRIVES)
                .setSize(1000,650)
                .setTitle('NC Viewer // Import GCode')
                .setOAuthToken(this.token)
                .setDeveloperKey(devKey)
                .setCallback((data) => this.pickerCallback(data))
                .build();
            picker.setVisible(true);
        }
    }

    pickerCallback(data) {
        if (!data) {
            console.log('No file selected.');
            return;
        }

        let url = '';
        if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED) {
            let doc = data[google.picker.Response.DOCUMENTS][0];
            url = doc[google.picker.Document.URL];

            console.log(data);
            console.log(`Picked: ${url}`);
        }
    }
}

export default new DrivePicker();
