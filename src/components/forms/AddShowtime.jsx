import { useState } from "react";
import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

import { uiActions } from "../../store/uiSlice";

const showTimeSchema = Yup.object({
    date: Yup.string()
        .required("Date is required")
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    time: Yup.string()
        .required("Time is required")
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Time must be in HH:mm format"),
});

const AddShowtime = ({ onSubmit }) => {

    const dispatch = useDispatch();

    const [error, setError] = useState("");

    const closeModal = () => {
        dispatch(uiActions.closeModal());
    };

    const handleSubmit = async (values, actions) => {
        setError("");
    };

    return (
        <Modal>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Add Showtime</h1>
            <Formik
                initialValues={{ date: "", time: "" }}
                validationSchema={showTimeSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-4 mt-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-900">Date</label>
                            <Field
                                name="date"
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <p className="text-xs font-medium text-red-600">
                                <ErrorMessage name="date" />
                                {error && error}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-900">Time</label>
                            <Field
                                name="time"
                                type="time"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <p className="text-xs font-medium text-red-600">
                                <ErrorMessage name="time" />
                                {error && error}
                            </p>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button type="button" variant="outline" onClick={closeModal}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Adding..." : "Add Showtime"}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default AddShowtime;
