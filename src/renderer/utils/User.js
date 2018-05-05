// User Class

class User {
    constructor() {
        this.uid = '';
        this.name = '';
        this.email = '';
        this.avatar = '';
        
        // Tokens
        this.access_token = '';
        this.id_token = '';
    }

    reset() {
        this.uid = '';
        this.name = '';
        this.email = '';
        this.avatar = '';

        // Tokens
        this.access_token = '';
        this.id_token = '';
    }
}

export default new User();