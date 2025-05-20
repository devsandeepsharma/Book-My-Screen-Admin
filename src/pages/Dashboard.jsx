import Button from "../components/ui/Button";
import { AuthService } from "../services/Authentication";

const Dashboard = () => {

    const logoutAdmin = () => {
        AuthService.logout();
    }

    return (
        <main>
            <h1>Dashboard Page</h1>
            <Button onClick={logoutAdmin}>Logout</Button>
        </main>
    )
}

export default Dashboard;