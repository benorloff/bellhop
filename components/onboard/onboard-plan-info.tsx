"use client"

import { cn, unitPriceToDollars } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

interface OnBoardPlanInfoProps {
    prices: Prisma.PriceGetPayload<{
        include: { product: true };
    }>[];
}

export const OnboardPlanInfo = ({
    prices,
}: OnBoardPlanInfoProps) => {

    const [plan, setPlan] = useState<string>("");

    const handleClick = (priceId: string) => {
        priceId === plan ? setPlan("") :
        setPlan(priceId);
    }

    useEffect(() => {
        console.log(plan, "plan")
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full gap-4">
            {prices.map((price) => (
                <div 
                    role="button"
                    key={price.id}
                    className={cn(
                        "w-full border rounded-md p-4",
                        plan !== "" && "text-foreground",
                        (plan && plan === price.id) && "bg-secondary border-primary",
                        (plan && plan !== price.id) && "text-muted-foreground",
                    )}
                    onClick={() => handleClick(price.id)}
                >
                    <p>{price.product.name}</p>
                    <p>{unitPriceToDollars(price.unitAmount)}</p>
                </div>
            ))}
        </div>
    )
}