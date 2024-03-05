"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardTitleProps {
    title: string;
}

export const DashboardTitle = ({
    title,
}: DashboardTitleProps) => {

    const paths = usePathname();
    console.log(paths, '<--- paths from dashboard-title.tsx')
    const pathNames = paths.split("/").filter(Boolean);
    console.log(pathNames, '<--- pathNames from dashboard-title.tsx')
    return (
        <div className="flex flex-row gap-2 items-center mb-8">
            {pathNames.map((path, index) => {
                let href=`/${pathNames.slice(0, index + 1).join('/')}`
                let label= path[0].toUpperCase() + path.slice(1);
                return (
                    <>
                        <Link 
                            key={index}
                            href={href} 
                            className={cn(
                                "text-3xl",
                                index !== pathNames.length - 1 && "text-muted-foreground hover:text-primary"
                            )}
                        >
                            {label}
                        </Link>
                        {index !== pathNames.length - 1 && <ChevronRight className="text-muted-foreground"/>}
                    </>
                )
            })}
        </div>
    );
}