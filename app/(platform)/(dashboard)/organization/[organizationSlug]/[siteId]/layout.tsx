import { db } from "@/lib/db";

import { SiteHeader } from "@/components/sites/site-header";
import { SiteNav } from "@/components/sites/site-nav";

interface SiteLayoutProps {
    params: {
        organizationSlug: string;
        siteId: string;
    },
    children: React.ReactNode;
}

export default async function SiteLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: {
        organizationSlug: string;
        siteId: string;
    }
}) {

    const site = await db.site.findUnique({
        where: {
            id: params.siteId,
        },
        include: {
            members: {
                include: {
                    profile: true,
                },
            },
        }
    });

    if (!site) {
        throw new Error("Site not found");
    }

    const basePath = `/organization/${site.orgSlug}/${site.id}`

    return (
        <>
            <SiteHeader {...site} />
            <SiteNav basePath={basePath}/>
            {children}
        </>
    );
};