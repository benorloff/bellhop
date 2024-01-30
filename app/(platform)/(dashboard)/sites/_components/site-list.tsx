import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Skeleton } from "@/components/ui/skeleton";

export const SiteList = async () => {

    const { orgId, orgSlug } = auth();

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sites.map((site) => (
                    <Link
                        key={site.id}
                        href={`/organization/${orgSlug}/${site.id}`}
                        className="group relative bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-4 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"/>
                        {/* TODO: Change this image to site image */}
                        <Image 
                            src="/placeholder-150x150.svg"
                            alt={site.name}
                            width="75"
                            height="25"
                        />
                        <p className="relative font-semibold text-white">
                            {site.name}
                        </p>
                        <p className="relative text-white">
                            {site.url}
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