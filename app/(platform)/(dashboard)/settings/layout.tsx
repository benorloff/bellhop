import { DashboardTitle } from "@/components/dashboard-title";
import { NavMenu } from "@/components/nav-menu";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const navItems = [
        { label: "Overview", path: "" },
        { label: "Account", path: "account"},
        { label: "Team", path: "team" },
        { label: "Billing", path: "billing" },
        { label: "Notifications", path: "notifications" },
    ];

    return (
        <>
            <DashboardTitle />
            <NavMenu basePath="/settings" navItems={navItems} />
            {children}
        </>
    );
}