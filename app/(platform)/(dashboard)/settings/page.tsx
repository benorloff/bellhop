import { DashboardTitle } from "@/components/dashboard-title";
import Link from "next/link";

const SettingsPage = () => {
    return (
        <>
            <div className="flex flex-row w-full gap-4">
                <Link 
                    href="/settings/billing"
                    className="w-1/3 p-4 border rounded-lg hover:bg-muted"
                >
                    <h2 className="text-lg">Billing</h2>
                </Link>
                <Link 
                    href="/settings/team"
                    className="w-1/3 p-4 border rounded-lg hover:bg-muted"
                >
                    <h2 className="text-lg">Team</h2>
                </Link>
            </div>
        </>
    );
};

export default SettingsPage;