import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const preferredRegion = "home";

export default async function Dashboard() {
    const session = await auth();

    if (!session) {
        redirect("/register");
    }

    return (
        <div className="px-12 md:px-32 py-12 text-gray-700 dark:text-white">
            <h1 className="text-3xl font-bold">Overview</h1>
            <section>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-8 border border-gray-300">A</div>
                    <div className="p-8 border border-gray-300">A</div>
                    <div className="p-8 border border-gray-300">A</div>
                    <div className="p-8 border border-gray-300">A</div>
                </div>
            </section>
        </div>
    );
}
