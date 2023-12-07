import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({ children }: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full">
            <Navbar />
            <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
                <div className="flex gap-7">
                    <div className="w-64 shrink-0 hidden md:block">
                        <Sidebar />
                    </div>
                    {children}
                </div>
            </main>
        </div>
    )
};

export default DashboardLayout;