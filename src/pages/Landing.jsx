import Button from "../components/ui/Button";

const Landing = () => {
    return (
        <main class="min-h-[calc(100vh-8.8rem)] flex flex-col items-center justify-center px-6 text-center space-y-6 max-w-3xl mx-auto">
            <h1 class="text-4xl sm:text-5xl font-bold leading-tight text-gray-900">
                Welcome to <span class="text-teal-600">BookMyScreen</span>  Admin Panel
            </h1>
            <p class="text-gray-600 text-lg">
                From movies to bookings, take full control of your cinema operations from a single dashboard — fast, intuitive, and powerful.
            </p>
            <Button className="mt-2" to="/login" isLink>Login as Admin</Button>
            <p class="text-xs text-gray-400 mt-[-10px]">Access restricted to authorized admins only</p>
        </main>
    )
}

export default Landing;