import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import Button from "../components/ui/Button";
import { AuthService } from "../services/Authentication";

const Login = () => {

    const [toggle, setToggle] = useState(false);
    const [error, setError] = useState(false);
    
    const handleToggle = () => {
        setToggle(prev => !prev);
    }

    const LoginSchema = Yup.object({
        email: Yup.string()
            .email("Please enter a valid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .max(12, "Password can't be longer than 12 characters")
            .required("Password is required"),
    });

    const loginAdmin = async (values, actions) => {
        setError("");
        try {
            const admin = await AuthService.login(values.email, values.password);
            console.log(admin);
        } catch (error) {
            setError(error);
        } finally {
            actions.setSubmitting(false);
        }
    }

    return (
        <main className="min-h-[calc(100vh-8.8rem)] max-w-6xl mx-auto pt-8">
            <div className="max-w-md w-full mx-auto shadow sm:shadow-md md:rounded-2xl p-8">
                <h1 class="text-2xl font-bold text-gray-900 mb-1">Admin Login</h1>
                <p class="text-sm text-gray-600 mb-4">Enter your credentials to access the dashboard</p>
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={(values, actions) => {
                        loginAdmin(values, actions);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col gap-3">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-900">Email</label>
                                <Field 
                                    className="w-full px-4 py-2 pt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" 
                                    name="email" 
                                    type="email" 
                                    placeholder="admin@gmail.com" 
                                />
                                <p className="text-xs font-medium text-red-600">
                                    <ErrorMessage name="email" />
                                    {error && error}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-900">Password</label>
                                <div className="relative">
                                    <Field 
                                        className="w-full px-4 py-2 pt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" 
                                        name="password" 
                                        type={toggle ? "text": "password"} 
                                        placeholder="••••••••"
                                    />
                                    <Button 
                                        className="absolute right-1" 
                                        variant="ghost" 
                                        type="button" 
                                        onClick={handleToggle}
                                    >
                                        {toggle ? "Hide": "Show"}
                                    </Button>
                                </div>
                                <p className="text-xs font-medium text-red-600">
                                    <ErrorMessage name="password" />
                                    {error && error}
                                </p>
                            </div>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Loging in..": "Login"}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    )
}

export default Login;