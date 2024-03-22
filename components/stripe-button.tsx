"use client";

import { createStripeSession } from "@/actions/create-stripe-session";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { StripeSession } from "@/actions/create-stripe-session/schema";
import { cn } from "@/lib/utils";

interface StripeButtonProps {
    customerId?: string;
    priceId?: string;
    flow_data?: string;
    label: string;
};

export const StripeButton = ({
    customerId,
    priceId,
    flow_data,
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
        execute({ customerId, priceId, flow_data, label });
    }

    return (
        <Button
            onClick={onClick}
            disabled={isLoading}
            className="relative"
        >
            <span
                className={cn(
                    isLoading ? "opacity-0" : "opacity-100",
                )}
            >
                {label}
            </span>
            {isLoading 
                && <Loader2 className="absolute mx-auto h-4 w-4 animate-spin" /> 
            }
        </Button>

    )

}