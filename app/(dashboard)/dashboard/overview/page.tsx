import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { baseURL } from "@lib/constants";
import { authOptions } from "@api/auth/[...nextauth]/route";
import AddTransaction from "@components/Form/AddTransaction.component";

export const preferredRegion = "home";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/register");
    }

    const res = await fetch(baseURL + "/api/mainCategory", {
        method: "GET",
        headers: Object.fromEntries(headers()),
        next: {
            tags: ["mainCategory"],
        },
    });
    const { mainCategories } = await res.json();

    return (
        <div className="px-12 md:px-32 py-12 text-gray-700 dark:text-white">
            <h1 className="text-3xl font-bold">Overview</h1>
            <section className="mt-6">
                <AddTransaction mainCategories={mainCategories} />
            </section>
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
