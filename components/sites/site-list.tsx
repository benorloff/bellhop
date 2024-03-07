import { auth } from "@clerk/nextjs";
import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { SiteImage } from "./site-image";
import { SiteMembers } from "./site-members";

export const SiteList = async () => {
    const { userId } = auth();

    const sites = await db.site.findMany({
        where: {
            members: {
                some: {
                    userId: userId!,
                }
            }
        }, 
        include: {
            members: true
        }
    })

    if (!sites) {
        return (
            <div className="flex justify-center items-center bg-card border rounded-sm shadow p-8">
                No sites yet...
            </div>
        )
    };

    return (
        <div className="flex flex-col gap-4 space-y-4">
            {sites.map((site) => (
                <div
                    key={site.id}
                    className="flex flex-row flex-wrap justify-between items-center bg-card border gap-4 rounded-sm shadow p-8"
                >
                    <Link
                        href={`/organization/${site.orgSlug}/${site.id}`}
                    >
                        <SiteImage 
                            {...site}
                        />
                    </Link>
                    <div className="flex flex-col grow gap-1">
                        <Link
                            href={`/organization/${site.orgSlug}/${site.id}`}
                        >
                            <p className="font-semibold text-xl">
                                {site.name}
                            </p>
                        </Link>
                        <p>
                            {site.url}
                        </p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <SiteMembers siteId={site.id} members={site.members} />
                    </div>
                </div>
            ))}
        </div>
    )
};

SiteList.Skeleton = function SkeletonSiteList() {
    return (
        <div className="flex flex-col gap-4 space-y-4">
            <Skeleton className="h-[150px] w-full p-2" />
            <Skeleton className="h-[150px] w-full p-2" />
            <Skeleton className="h-[150px] w-full p-2" />
            <Skeleton className="h-[150px] w-full p-2" />
            <Skeleton className="h-[150px] w-full p-2" />
            <Skeleton className="h-[100px] w-full p-2" />
            <Skeleton className="h-[100px] w-full p-2" />
            <Skeleton className="h-[100px] w-full p-2" />
        </div>
    )
}