export declare class AuthData {
    fireAuth: any;
    userProfile: any;
    constructor();
    loginUser(email: string, password: string): any;
    logoutUser(): any;
    signupUser(email: string, password: string): any;
    resetPassword(email: string): any;
}
