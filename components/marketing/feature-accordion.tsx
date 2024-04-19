"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { Overline } from "./overline";


export const FeatureAccordion = () => {
    const [active, setActive] = useState<number | null>(1);

    return (
        <div className="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-4 gap-4 h-full">
            <div className="relative lg:col-span-3 bg-muted">
                <div className={cn(
                    "h-full w-full",
                    active === 1 ? "opacity-100" : "opacity-0"
                )}>
                    <Image
                        src="/logo.svg"
                        alt="placeholder"
                        width={400}
                        height={300}
                        className={cn(
                            "absolute top-0 left-0 m-auto transition-opacity duration-300 ease-in-out",
                        )}
                    />
                </div>
                <div className={cn(
                    "h-full w-full",
                    active === 2 ? "opacity-100" : "opacity-0"
                )}>
                    <Image
                        src="/next.svg"
                        alt="placeholder"
                        width={400}
                        height={300}
                        className={cn(
                            "absolute top-0 left-0 m-auto transition-opacity duration-300 ease-in-out",
                        )}
                    />
                </div>
                <div className={cn(
                    "h-full w-full",
                    active === 3 ? "opacity-100" : "opacity-0"
                )}>
                    <Image
                        src="/vercel.svg"
                        alt="placeholder"
                        width={400}
                        height={300}
                        className={cn(
                            "absolute top-0 left-0 m-auto transition-opacity duration-300 ease-in-out",
                        )}
                    />
                </div>
            </div>
            <div className="relative lg:col-span-1 h-full space-y-8">
                <div className="space-y-2">
                    <Overline title="Features" />
                    <h2 className="text-4xl">
                        Lorem ipsum dolor sit amet.
                    </h2>
                </div>
                <Accordion type="single" defaultValue="1" className="w-full border-t border-x">
                    <AccordionItem 
                        value="1"
                        className={cn(
                            "relative text-lg group before:content[''] before:w-[2px] before:absolute before:top-0 before:left-0 before:bg-foreground before:transition-all before:ease-in-out before:duration-500 ",
                            active === 1 
                                ? "before:h-full before:opacity-100"
                                : "before:h-0 before:opacity-0"
                        )}
                    >
                        <AccordionTrigger
                            onClick={() => setActive(1)}
                            className="text-muted-foreground data-[state=open]:text-foreground p-6 group-hover:text-foreground !no-underline transition-colors ease-in-out duration-500"
                        >
                            Accordion 1
                        </AccordionTrigger>
                        <AccordionContent
                            className="p-6 pt-0"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem 
                        value="2"
                        className={cn(
                            "relative text-lg group before:content[''] before:w-[2px] before:absolute before:top-0 before:left-0 before:bg-foreground before:transition-all before:ease-in-out before:duration-500 ",
                            active === 2 
                                ? "before:h-full before:opacity-100"
                                : "before:h-0 before:opacity-0"
                        )}
                    >
                        <AccordionTrigger
                            onClick={() => setActive(2)}
                            className="text-muted-foreground data-[state=open]:text-foreground p-6 group-hover:text-foreground !no-underline transition-colors ease-in-out duration-500"
                        >
                            Accordion 2
                        </AccordionTrigger>
                        <AccordionContent
                            className="p-6 pt-0"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem 
                        value="3"
                        className={cn(
                            "relative text-lg group before:content[''] before:w-[2px] before:absolute before:top-0 before:left-0 before:bg-foreground before:transition-all before:ease-in-out before:duration-500 ",
                            active === 3 
                                ? "before:h-full before:opacity-100"
                                : "before:h-0 before:opacity-0"
                        )}
                    >
                        <AccordionTrigger
                            onClick={() => setActive(3)}
                            className="text-muted-foreground data-[state=open]:text-foreground p-6 group-hover:text-foreground !no-underline transition-colors ease-in-out duration-500"
                        >
                            Accordion 3
                        </AccordionTrigger>
                        <AccordionContent
                            className="p-6 pt-0"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}