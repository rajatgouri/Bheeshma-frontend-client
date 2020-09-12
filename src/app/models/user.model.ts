export class User {
    constructor(
        public id: string, 
        public firstname: string,
        public lastname: string,
        public email: string,
        public role: string,
        public accessToken: string,
        public refreshToken: string
        ) {}

    get token() {
        return {'accessToken': this.accessToken, 'refreshToken': this.refreshToken  }

    }
}