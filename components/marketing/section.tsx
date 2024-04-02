import { cn } from "@/lib/utils"

export const Section = ({ 
    fullHeight,
    children,
}: {
    fullHeight?: boolean,
    children: React.ReactNode
}) => {
    return (
        <section 
            className={cn(
                "m-auto py-16",
                fullHeight ? "h-screen" : "h-full"
            )}
        >
                {children}
        </section>
    );
}