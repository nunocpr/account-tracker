import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { fetchTransactions } from "@/app/_lib/db/transactionFunctions";
import Table from "@/app/_components/Table/Table.component";

export const preferredRegion = "home";

export default async function Dashboard() {
    const session = await auth();

    if (!session) {
        redirect("/register");
    }

    const transactions = await fetchTransactions(session);

    return (
        <div className="px-12 md:px-32 py-12 text-gray-700 dark:text-white">
            <h1 className="text-3xl font-bold">Overview</h1>
            <section className="">
                <div className="mt-6">
                    {/* <Table transactions={transactions} /> */}
                    <Table transactions={transactions} />
                </div>
            </section>
        </div>
    );
}
