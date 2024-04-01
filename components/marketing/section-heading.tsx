import { cn } from "@/lib/utils";
import { Overline } from "./overline";

interface SectionHeadingProps {
    overline: string;
    headline: string;
    subheading: string;
    align?: "left" | "center" | "right";
}

export const SectionHeading = ({
    overline,
    headline,
    subheading,
    align,
}: SectionHeadingProps) => {
    return (
        <div className={cn(
            "max-w-3xl space-y-4 text-center m-auto mb-16",
            align ? `text-${align}` : "text-center"
            )}
        >
            <Overline title={overline} />
            <div className="text-6xl">
                {headline}
            </div>
            <div className="text-muted-foreground">
                {subheading}
            </div>
        </div>
    )
}