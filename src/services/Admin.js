import { getDatabase, ref, push, set, get, update, remove } from "firebase/database";

import { app } from "./config";

class Admin {
    constructor(path) {
        this.db = getDatabase(app);
        this.path = path;
    }

    create(data) {
        const dbRef = ref(this.db, this.path);
        return push(dbRef, { ...data, createdAt: Date.now() });
    }

    fetchAll() {
        const dbRef = ref(this.db, this.path);
        return get(dbRef).then(snapshot => {
            const data = snapshot.val();
            if (!data) return [];
            return Object.entries(data).map(([id, value]) => ({
                id,
                ...value
            }));
        });
    }

    update(id, updatedData) {
        const dbRef = ref(this.db, `${this.path}/${id}`);
        return update(dbRef, updatedData);
    }

    updateNested(path, updatedData) {
        const dbRef = ref(this.db, path);
        return set(dbRef, updatedData);
    }

    delete(id) {
        const dbRef = ref(this.db, `${this.path}/${id}`);
        return remove(dbRef);
    }
}

export const CategoryService = new Admin("categories");
export const MovieService = new Admin("movies");