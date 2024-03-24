import { Logo } from "@/components/logo";
import { OnboardHeader } from "@/components/onboard/onboard-header";
import { OnboardStoreProvider } from "@/components/providers/onboard-provider";

const OnboardingLayout = ({ 
    children 
}: {
    children: React.ReactNode
}) => {
    return (
        <OnboardStoreProvider>
            <main>
                <OnboardHeader />
                <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-auto p-8 space-y-4">
                    {children}
                </section>
            </main>
        </OnboardStoreProvider>
    );
};

export default OnboardingLayout;