import { Suspense } from "react";
import { SiteList } from "./_components/site-list";

const SitesPage = () => {
    return ( 
        <div className="w-full mb-20">
            <div className="px-2 md:px-4">
                <Suspense fallback={<SiteList.Skeleton />}>
                    <SiteList />
                </Suspense>
            </div>
        </div>
     );
}
 
export default SitesPage;