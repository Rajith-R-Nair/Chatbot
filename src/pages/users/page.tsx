import Link from "next/link";
import {prisma} from "@/db";
import {redirect} from "next/navigation";

async function createUser(data: FormData) {
    "use server"

    const username = data.get("username")?.valueOf()
    const password = data.get("password")?.valueOf()
    const email = data.get("email")?.valueOf()
    if (typeof username !== "string" || username.length === 0) {
        throw new Error("Invalid username")
    }
    if (typeof password !== "string" || password.length === 0) {
        throw new Error("Invalid password")
    }
    if (typeof email !== "string" || email.length === 0) {
        throw new Error("Invalid email")
    }

    // @ts-ignore
    await prisma.user.create({ data: { username, password, email } })
    redirect("/")
}
export default function Page() {
    return (
        <>
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-2xl">New</h1>
            </header>
            <form action={createUser} className="flex gap-2 flex-col">
                <input
                    type="text"
                    name="username"
                    className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
                />
                <input
                    type="text"
                    name="password"
                    className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
                />
                <input
                    type="text"
                    name="email"
                    className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
                />
                <div className="flex gap-1 justify-end">
                    <Link
                        href=".."
                        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
                    >
                        Create
                    </button>
                </div>
            </form>
        </>
    )
}