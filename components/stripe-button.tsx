"use client";

import { createStripeSession } from "@/actions/create-stripe-session";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface StripeButtonProps {
    priceId: string;
    label: string;
};



export const StripeButton = ({
    priceId,
    label,
}: StripeButtonProps) => {

    const { execute, isLoading } = useAction(createStripeSession, {
        onSuccess: (data) => {
            window.location.href = data;
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const onClick = () => {
        execute({ priceId });
    }

    return (
        <Button
            onClick={onClick}
            disabled={isLoading}
        >
            {isLoading 
                ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                : <>{label}</>
            }
        </Button>

    )

}