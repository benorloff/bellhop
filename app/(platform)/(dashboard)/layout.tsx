import { Container } from "./_components/container";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = async ({ children }: {
    children: React.ReactNode;
}) => {

    return (
        <>
            <Navbar />
            <div className="flex h-full pt-14">
                <Sidebar />
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
};

export default DashboardLayout;