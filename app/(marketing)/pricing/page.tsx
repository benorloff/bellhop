import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

const PricingPage = async () => {
    const user = await currentUser();

    return (
        <div className="flex flex-col gap-6 m-auto p-24">
            <div className="text-6xl font-bold">Simple, transparent pricing.</div>
            <div className="text-muted-foreground">Something here.</div>
            <div className="flex flex-row w-full border rounded-lg p-8">
                <div className="flex flex-col w-2/3 justify-between gap-6">
                    <div className="text-2xl font-bold">
                        What's Included
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <div className="w-full text-muted-foreground">
                            <ul className="space-y-4">
                                <li>Unlimited projects</li>
                                <li>Unlimited storage</li>
                                <li>Unlimited users</li>
                            </ul>
                        </div>
                        <div className="w-full text-muted-foreground">
                            <ul className="space-y-4">
                                <li>Unlimited projects</li>
                                <li>Unlimited storage</li>
                                <li>Unlimited users</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-1/3 justify-center items-center">
                    <div className="text-6xl font-bold">
                        $199
                    </div>
                    <div>
                        Billed Monthly
                    </div>
                    <Button className="mt-8">
                        <Link href={user ? "#" : "/sign-up"}>
                            Get Started
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PricingPage;