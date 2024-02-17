import { ModalProvider } from "@/components/providers/modal-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const PlatformLayout = ({ 
    children 
}: {
    children: React.ReactNode;
}) => {
    return (
        <ClerkProvider>
            <ModalProvider />
            <Toaster 
                position="top-center"
            />
            {children}
        </ClerkProvider>
    );
};

export default PlatformLayout;
