"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface StripeButtonProps {
    url: string;
};

export const StripeButton = ({
    url,
}: StripeButtonProps) => {
    const router = useRouter();
    return (
        <Button
            onClick={() => 
                router.push(url)
            }
        >
            Upgrade
        </Button>
    )

}