import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
        // <div className="space-y-4">
        //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        //         {sites.map((site) => (
        //             <Link
        //                 key={site.id}
        //                 href={`/organization/${orgSlug}/${site.id}`}
        //                 className="group relative bg-no-repeat bg-center bg-cover bg-white shadow rounded-sm h-full w-full p-4 overflow-hidden"
        //             >
        //                 <div className="absolute inset-0 group-hover:bg-black/10 transition"/>
        //                 {/* TODO: Change this image to site image */}
        //                 <Image 
        //                     src="/placeholder-150x150.svg"
        //                     alt={site.name}
        //                     width="75"
        //                     height="25"
        //                 />
        //                 <p className="relative font-semibold">
        //                     {site.name}
        //                 </p>
        //                 <p className="relative">
        //                     {site.url}
        //                 </p>
        //             </Link>
        //         ))}
        //     </div>
        // </div>
        <div className="flex flex-col gap-4 space-y-4">
            {sites.map((site) => (
                <Link
                    key={site.id}
                    href={`/organization/${orgSlug}/${site.id}`}
                    className="flex flex-row flex-wrap justify-between items-center bg-white gap-4 rounded-sm shadow p-8"
                >
                    <Image 
                        src="/placeholder-browser.svg"
                        alt={site.name}
                        width="150"
                        height="100"
                    />
                    <div className="flex flex-col grow gap-1">
                        <p className="font-semibold text-xl">
                            {site.name}
                        </p>
                        <p>
                            {site.url}
                        </p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <Avatar>
                            <AvatarFallback>BO</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarFallback>BO</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarFallback>BO</AvatarFallback>
                        </Avatar>
                    </div>
                </Link>
            ))}
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