import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../components/ui/Button";
import AddCategory from "../components/forms/AddCategory";

import { uiActions } from "../store/uiSlice";
import { categoriesActions } from "../store/categoriesSlice";
import { AdminService } from "../services/Admin";

const Categories = () => {

    const dispatch = useDispatch();

    const { isModalOpen } = useSelector((state) => state.ui);
    const { categories } = useSelector((state) => state.categories);

    const [editCategory, setEditCategory] = useState(false);

    const openModal = () => {
        setEditCategory(false);
        dispatch(uiActions.openModal());
    }

    const openEditModal = (category) => {
        setEditCategory(category);
        dispatch(uiActions.openModal());
    }

    const handleDeleteCategory = async (id) => {
        try {
            await AdminService.deleteCategory(id);
            dispatch(categoriesActions.removeCategory(id));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section>
            {isModalOpen && <AddCategory editCategory={editCategory} />}
            <div className="w-full px-6 py-4 md:py-6 flex items-center justify-between md:border-b md:border-gray-200">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Categories</h2>
                <Button
                    onClick={openModal}
                >
                    Add Category
                </Button>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 py-2 md:py-6">
                {
                    (!categories || categories.length === 0) ? (
                        <p className="text-center text-gray-500 mt-6 col-span-full">No categories added yet.</p>
                    ) : (
                        categories.map(category => (
                        <li key={category.id} className="bg-white border border-gray-100 rounded-lg p-4 shadow flex justify-between items-center">
                            <span className="font-medium text-gray-900">{category.category}</span>
                            <div className="space-x-2">
                                <Button 
                                    variant="link" 
                                    onClick={() => {openEditModal(category)}}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    variant="link" 
                                    onClick={() => {handleDeleteCategory(category.id)}}
                                >
                                    Delete
                                </Button>
                            </div>
                        </li>
                        ))
                    )
                }
            </ul>
        </section>
    )
}

export default Categories;