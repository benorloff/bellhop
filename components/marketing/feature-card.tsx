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
        <div className="flex flex-col gap-4 bg-background border rounded-lg p-8 group">
            {icon}
            <div className="text-3xl">
                {title}
            </div>
            <div className="text-muted-foreground group-hover:text-primary transition-colors ease-in-out">
                {description}
            </div>
        </div>
    )
}