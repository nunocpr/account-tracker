import { RegisterForm } from "@components/registerForm.component";
import { LoginForm } from "../_components/loginForm.component";

export default function RegisterPage() {
    return (
        <div className="flex h-[70dvh] justify-center items-center">
            <div>
                <LoginForm />
            </div>
        </div>
    );
}
