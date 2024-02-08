import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({ children }: {
    children: React.ReactNode;
}) => {
    return (
        <>
            <Navbar />
            <div className="flex h-full pt-14">
                <Sidebar />
                <div className="flex-1 ml-48 p-10 bg-[#F6F6F6] overflow-y-auto ">
                    {children}
                </div>
            </div>
        </>
    )
};

export default DashboardLayout;