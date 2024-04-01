import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const MarketingLayout = ({ 
    children 
}: {
    children: React.ReactNode
}) => {
    return (
        <>
            <Navbar />
            <main className="max-w-screen-xl mx-auto overflow-auto px-8">
                {children}
            </main>
            <Footer />
        </>
    );
};

export default MarketingLayout;