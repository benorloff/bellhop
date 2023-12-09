import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Skeleton } from "@/components/ui/skeleton";

export const SiteList = async () => {

    const { orgId } = auth();

    if (!orgId) {
        return redirect("/select/org");
    };

    const sites = await db.site.findMany({
        where: {
            orgId,
        }
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg">
                Sites
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {sites.map((site) => (
                    <Link
                        key={site.id}
                        href={`/organization/${orgId}/${site.slug}`}
                        className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"/>
                        <p className="relative font-semibold text-white">
                            {site.name}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
};

SiteList.Skeleton = function SkeletonSiteList() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
        </div>
    )
}