import { getDatabase, ref, push, get, update, remove } from "firebase/database";

import { app } from "./config";

class Admin {
    constructor() {
        this.db = getDatabase(app);
    }

    createCategory (category) {
        const dbRef = ref(this.db, "categories");

        return push(dbRef, {category, createdAt: Date.now() });
    }

    fetchCategories () {
        const dbRef = ref(this.db, 'categories');

        return get(dbRef).then(snapshot => {
            const data = snapshot.val();
            if (!data) return [];

            return Object.entries(data).map(([id, value]) => ({
                id,
                ...value
            }));
        });
    }

    updateCategory(id, updatedCategory) {
        const dbRef = ref(this.db, `categories/${id}`);

        return update(dbRef, { category: updatedCategory });
    }

    deleteCategory(id) {
        const dbRef = ref(this.db, `categories/${id}`);

        return remove(dbRef);
    }
}

export const AdminService = new Admin();