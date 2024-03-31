"use client"

import { cn, unitPriceToDollars } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { AppWindow, BookOpen, Briefcase, Building2, Check, ConciergeBell } from "lucide-react";

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
        <Card>
            <CardHeader>
                <CardTitle>Start your free trial</CardTitle>
                <CardDescription>Try a paid plan for 14 days.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center w-full gap-4">
                    {prices.map((price) => (
                        <div 
                            role="button"
                            key={price.id}
                            className={cn(
                                "relative flex flex-row gap-4 items-center border rounded-lg p-4 w-full",
                                plan !== "" && "text-foreground",
                                (plan && plan === price.id) && "bg-secondary border-primary",
                                (plan && plan !== price.id) && "text-muted-foreground",
                            )}
                            onClick={() => handleClick(price.id)}
                        >
                            {plan && plan === price.id && 
                                <Check size={24} className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1"/>
                            }
                            <div className={cn(
                                "border rounded-lg p-4",
                                plan && plan === price.id && "border-primary"
                                )}
                            >
                                { price.product.name === "Basic Plan" && <AppWindow size={24} /> }
                                { price.product.name === "Premium Plan" && <Briefcase size={24} /> }
                                { price.product.name === "Enterprise Plan" && <Building2 size={24} /> }
                            </div>
                            <div>
                                <p className="text-xl">{price.product.name}</p>
                                <p className="text-sm">{price.product.description}</p>
                            </div>
                            <div className="grow text-right"><span className="text-lg font-semibold">{unitPriceToDollars(price.unitAmount)}</span>/mo</div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="justify-end">
                <Button type="submit">Next</Button>
            </CardFooter>
        </Card>
        
    )
}