import { auth } from "@/auth";

export default async function Homepage() {
    const session = await auth();
    return (
        <div className="md:px-32">
            <h1 className="pb-8 bg-gradient-to-br from-slate-950 via-slate-500 to-slate-400 dark:from-slate-600 dark:via-slate-300 dark:to-slate-50 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
                Personal Account Tracker
            </h1>

            <p className="text-white py-4">
                Welcome,{" "}
                <span>
                    {session ? session?.user?.name : "please register above."}
                </span>
            </p>

            {/* <div className="flex flex-col justify-center items-center"></div> */}
        </div>
    );
}
