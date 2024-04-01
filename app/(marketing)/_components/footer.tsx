import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const Footer = () => {
    return (
        <div className="w-full p-4 border-t bg-background px-8">
            <div className="max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo />
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between">
                    <Button size="sm" variant="ghost">
                            Privacy Policy
                    </Button>
                    <Button size="sm" variant="ghost">
                            Terms of Service
                    </Button>
                </div>
            </div>
        </div>
    )
};