import { SiteHeader } from "@/components/sites/site-header";
import { SiteNav } from "@/components/sites/site-nav";
import { getSite } from "@/lib/get-site";

export default async function SiteLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: {
        siteId: string;
    }
}) {
    const site = await getSite(params.siteId);

    const basePath = `/organization/${site?.orgSlug}/${site?.id}`

    return (
        <>
            <SiteHeader {...site!} /> 
            <SiteNav basePath={basePath}/>
            {children}
        </>
    );
};