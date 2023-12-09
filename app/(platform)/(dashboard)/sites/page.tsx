import { Suspense } from "react";
import { SiteList } from "./_components/site-list";

const SitesPage = () => {
    return ( 
        <div>
            <Suspense fallback={<SiteList.Skeleton />}>
                <SiteList />
            </Suspense>
        </div>
     );
}
 
export default SitesPage;