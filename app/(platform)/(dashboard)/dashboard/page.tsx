import { initialProfile } from "@/lib/initial-profile";

const DashboardPage = async () => {
    const profile = await initialProfile();

    return ( 
        <div>
            <div className="text-3xl mb-8">Dashboard</div>
        </div>
     );
}
 
export default DashboardPage;