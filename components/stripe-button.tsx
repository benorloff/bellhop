"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface StripeButtonProps {
    priceId: string;
    label: string;
};

export const StripeButton = ({
    priceId,
    label,
}: StripeButtonProps) => {
    const router = useRouter();
    return (
        <Button
            onClick={() => 
                router.push("/")
            }
        >
            {label}
        </Button>

    )

}