import { RegisterForm } from "@components/registerForm.component";

export default function RegisterPage() {
    return (
        <div className="flex h-[70dvh] justify-center items-center">
            <div>
                <h1>Register</h1>
                <RegisterForm />
            </div>
        </div>
    );
}
