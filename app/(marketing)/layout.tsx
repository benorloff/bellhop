import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const MarketingLayout = ({ 
    children 
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-full pt-14 bg-background">
            <Navbar />
            <main className="flex-1 p-8 overflow-auto">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MarketingLayout;