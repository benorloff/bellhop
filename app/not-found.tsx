import Link from "next/link";
import { Navbar } from "./(marketing)/_components/navbar";
import { Button } from "@/components/ui/button";


export default function NotFound() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
                <Link href="/">
                    <Button>
                        Go back home
                    </Button>
                </Link>
            </div>
        </>
    )
}