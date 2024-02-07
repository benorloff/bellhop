import { initialProfile } from "@/lib/initial-profile";
import { currentGreeting } from "@/lib/current-greeting";

const DashboardPage = async () => {
    const profile = await initialProfile();

    const greeting = await currentGreeting();

    return ( 
        <div>
            <div className="text-3xl mb-8">{greeting}</div>
        </div>
     );
}
 
export default DashboardPage;