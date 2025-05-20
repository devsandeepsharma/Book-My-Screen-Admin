class Authentication {
    constructor() {
        this.user = null;
    }

    login (email, password) {
        return new Promise((resolve, reject) => {
            if(email === "admin@gmail.com" && password === "123567") {
                const admin = {
                    name: "admin",
                    email: email
                }

                localStorage.setItem("token", JSON.stringify(email));
                resolve(admin);
            } else {
                reject("Invalid credentials")
            }
        })
    }
}

export const AuthService = new Authentication();