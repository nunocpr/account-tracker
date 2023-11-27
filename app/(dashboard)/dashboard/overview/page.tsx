import { getServerSession } from "next-auth";
import { authOptions } from "@api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AddTransaction from "@components/Transaction/AddTransaction.component";

export const preferredRegion = "home";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/register");
    }

    return (
        <div className="p-12 md:px-32 text-gray-700 dark:text-white">
            <h1 className="text-3xl font-bold">Overview</h1>
            <section>
                <h2 className="mt-6 text-lg font-bold">Transactions</h2>
                <AddTransaction className="my-6" />
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
