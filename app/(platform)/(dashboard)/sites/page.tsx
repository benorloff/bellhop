import { Suspense } from "react";
import { SiteList } from "./_components/site-list";

const SitesPage = () => {
    return ( 
        <div className="w-full mb-20">
            <div className="text-3xl mb-8">Sites</div>
            <Suspense fallback={<SiteList.Skeleton />}>
                <SiteList />
            </Suspense>
        </div>
     );
}
 
export default SitesPage;