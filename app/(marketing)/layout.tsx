import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const MarketingLayout = ({ 
    children 
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="w-full bg-background">
            <Navbar />
            <main className="max-w-screen-2xl mx-auto p-8 overflow-auto">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MarketingLayout;