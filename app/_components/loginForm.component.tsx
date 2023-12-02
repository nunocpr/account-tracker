"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react";
import googleSVG from "@/images/google.svg";

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    // const onSubmit = async (e: FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         setLoading(true);
    //         setFormValues({ email: "", password: "" });

    //         const res = await signIn("credentials", {
    //             redirect: false,
    //             email: formValues.email,
    //             password: formValues.password,
    //             callbackUrl,
    //         });

    //         setLoading(false);

    //         if (!res?.error) {
    //             router.push(callbackUrl);
    //         } else {
    //             setError("invalid email or password");
    //         }
    //     } catch (error: any) {
    //         setLoading(false);
    //         setError(error);
    //     }
    // };

    // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = event.target;
    //     setFormValues({ ...formValues, [name]: value });
    // };

    return (
        <form onSubmit={() => signIn("google", { callbackUrl })}>
            <a
                className="px-7 py-2 text-gray-700 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3 bg-indigo-200 hover:bg-indigo-300 focus:bg-indigo-300 focus:ring-indigo-300 active:bg-indigo-300"
                onClick={() => signIn("google", { callbackUrl })}
                role="button"
            >
                <Image
                    className="pr-2 w-8 h-8"
                    width={32}
                    height={32}
                    src={googleSVG}
                    alt=""
                />
                Continue with Google
            </a>
        </form>
    );
};
