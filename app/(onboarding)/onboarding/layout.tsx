import { Logo } from "@/components/logo";

const OnboardingLayout = ({ 
    children 
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-full bg-background">
            <main className="flex h-full flex-1 flex-col items-center justify-center p-8 overflow-auto space-y-4">
                <Logo />
                {children}
            </main>
        </div>
    );
};

export default OnboardingLayout;