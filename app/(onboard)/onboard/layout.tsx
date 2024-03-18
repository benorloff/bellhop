import { Logo } from "@/components/logo";
import { OnboardStoreProvider } from "@/components/providers/onboard-provider";

const OnboardingLayout = ({ 
    children 
}: {
    children: React.ReactNode
}) => {
    return (
        <main className="h-full bg-background">
            <section className="flex h-full flex-1 flex-col items-center justify-center p-8 overflow-auto space-y-4">
                <OnboardStoreProvider>
                    {children}
                </OnboardStoreProvider>
            </section>
        </main>
    );
};

export default OnboardingLayout;