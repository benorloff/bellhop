import { ArrowUpRight } from "lucide-react";

interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactElement;
    className?: string;
}

export const FeatureCard = ({
    title, 
    description, 
    icon,
    className
}: FeatureCardProps) => {
    return (
        <div className="flex flex-col gap-4 bg-background border p-8 pb-8 group hover:bg-muted/40 hover:pb-12 hover:gap-2 hover:cursor-pointer transition-all ease-in-out duration-500 aspect-square">
            <div className="flex flex-row items-center justify-between">
                {icon}
                <ArrowUpRight 
                    className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all ease-in-out duration-500"
                />
            </div>
            <div className="flex flex-col grow justify-end">
                <div className="text-3xl">
                    {title}
                </div>
            </div>
            <div className="text-muted-foreground group-hover:text-primary transition-colors duration-500 ease-in-out">
                {description}
            </div>
        </div>
    )
}