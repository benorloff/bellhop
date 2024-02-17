import { ModalProvider } from "@/components/providers/modal-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const PlatformLayout = ({ 
    children 
}: {
    children: React.ReactNode;
}) => {
    return (
        <ClerkProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <ModalProvider />
                <Toaster 
                    position="top-center"
                    richColors={true}
                    closeButton={true}
                />
                {children}
            </ThemeProvider>
        </ClerkProvider>
    );
};

export default PlatformLayout;
