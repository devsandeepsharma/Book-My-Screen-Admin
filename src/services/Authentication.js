class Authentication {
    constructor() {
        this.user = JSON.parse(localStorage.getItem("token")) || null;
        this.listeners = [];
    }

    login(email, password) {
        return new Promise((resolve, reject) => {
            if (email === import.meta.env.VITE_ADMIN_EMAIL && password === import.meta.env.VITE_ADMIN_PASSWORD) {
                this.user = { name: "admin", email };
                localStorage.setItem("token", JSON.stringify(this.user));
                this.notifyListeners();
                resolve(this.user);
            } else {
                reject("Invalid credentials");
            }
        });
    }

    logout() {
        this.user = null;
        localStorage.removeItem("token");
        this.notifyListeners();

        return Promise.resolve(null);
    }

    onAuthStateChanged(callback) {
        this.listeners.push(callback);
        callback(this.user);

        return () => {
            this.listeners = this.listeners.filter((listener) => listener !== callback);
        };
    }

    notifyListeners() {
        this.listeners.forEach((callback) => callback(this.user));
    }
}

export const AuthService = new Authentication();