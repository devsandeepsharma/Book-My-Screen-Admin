import { useState } from "react";
import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

import { uiActions } from "../../store/uiSlice";

const AddCategory = () => {
    
    const dispatch = useDispatch();

    const [error, setError] = useState(false);
    
    const categorySchema = Yup.object({
        category: Yup.string()
            .max(12, "Category can't be longer than 12 characters")
            .required("Category is required"),
    });

    const closeModal = () => {
        dispatch(uiActions.closeModal());
    }
    
    const addCategory = async (values, actions) => {

    }

    return (
        <Modal>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Add Category</h1>
            <Formik
                initialValues={{
                    category: ""
                }}
                validationSchema={categorySchema}
                onSubmit={(values, actions) => {
                    addCategory(values, actions);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-3 mt-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-900">Category</label>
                            <Field 
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" 
                                name="category" 
                                type="text" 
                                placeholder="e.g. Top Rated" 
                            />
                            <p className="text-xs font-medium text-red-600">
                                <ErrorMessage name="category" />
                                {error && error}
                            </p>
                        </div>
                        <div className="flex gap-3 ml-auto">
                            <Button type="button" variant="outline" onClick={closeModal}>Close</Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Adding...": "Add Category"}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}

export default AddCategory;