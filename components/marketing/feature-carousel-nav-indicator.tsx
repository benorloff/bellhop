import { cn } from "@/lib/utils";

export const FeatureCarouselNavIndicator = ({
    activeFeature,
}: {
    activeFeature: number
}) => {
    return (
        <div className={cn(
            "absolute top-0 left-0 h-[1px] w-full bg-primary",
            activeFeature === 1 && "[clip-path:inset(0px_75%_0px_25%)]",
            activeFeature === 2 && "[clip-path:inset(0px_50%_0px_25%)]",
            activeFeature === 3 && "[clip-path:inset(0px_25%_0px_50%)]",
            activeFeature === 4 && "[clip-path:inset(0px_0%_0px_75%)]",
            )}
        />
    )
};