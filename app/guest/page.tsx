import AddMainCategory from "@components/MainCategory/AddMainCategory.component";
import CategoryComboBox from "@components/Form/CategoryComboBox.component";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { baseURL } from "../_lib/constants";

export const preferredRegion = "home";
export const dynamic = "force-dynamic";

export default async function Home() {
    const session = await auth();

    const res = await fetch(baseURL + "/api/mainCategory", {
        method: "GET",
        headers: Object.fromEntries(headers()),
        next: {
            tags: ["mainCategory"],
        },
    });

    const { mainCategories } = await res.json();

    return (
        <div className="container mx-auto p-12 md:px-32 space-y-4 min-h-screen ">
            <h1 className="pt-16 pb-8 bg-gradient-to-br from-slate-950 via-slate-500 to-slate-400 dark:from-slate-600 dark:via-slate-300 dark:to-slate-50 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
                Personal Account Tracker
            </h1>
            {/* BreadCrumbs */}

            {/* Welcome message */}
            <p className="text-white py-4">
                Welcome,{" "}
                <span>
                    {!session ? "please register above." : session?.user?.name}
                </span>
            </p>

            {session && (
                <CategoryComboBox
                    name={"Categories"}
                    mainCategories={mainCategories}
                />
            )}

            {session && <AddMainCategory />}
        </div>
    );
}
