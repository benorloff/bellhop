import { DashboardTitle } from "@/components/dashboard-title";
import Link from "next/link";

const SettingsPage = () => {
    return (
        <>
            <DashboardTitle title="Settings" />
            <div className="flex flex-row w-full gap-4">
                <Link 
                    href="/settings/billing"
                    className="w-1/3 p-4 border rounded-lg hover:bg-muted"
                >
                    <h2 className="text-lg">Billing</h2>
                </Link>
                <div className="w-1/3 p-4 border rounded-lg">
                    <h2 className="text-lg">Billing</h2>
                </div>
                <div className="w-1/3 p-4 border rounded-lg">
                    <h2 className="text-lg">Billing</h2>
                </div>
            </div>
        </>
    );
};

export default SettingsPage;