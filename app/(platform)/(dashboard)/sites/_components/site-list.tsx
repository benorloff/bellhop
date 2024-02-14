import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Skeleton } from "@/components/ui/skeleton";
import { Member, Profile } from "@prisma/client";
import { SiteMembers } from "./site-members";

export const SiteList = async () => {

    const { orgId, orgSlug } = auth();

    if (!orgId) {
        return redirect("/select/org");
    };

    const sites = await db.site.findMany({
        where: {
            orgId,
        }, 
        include: {
            members: {
                include: {
                    profile: true,
                },
            },
        }
    });

    const siteProfiles = (siteMembers: Member[]) => {
        let profiles: Profile[] = [];
        siteMembers.map((member: Member) => {
            profiles.push(member.profile);
        });
        return profiles;
    }

    return (
        <div className="flex flex-col gap-4 space-y-4">
            {sites.map((site) => (
                <Link
                    key={site.id}
                    href={`/organization/${orgSlug}/${site.id}`}
                    className="flex flex-row flex-wrap justify-between items-center bg-white gap-4 rounded-sm shadow p-8"
                >
                    <Image 
                        src={site.imageUrl || "/placeholder-browser.svg"}
                        alt={site.name}
                        width="150"
                        height="100"
                        className="rounded-sm"
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
                        <SiteMembers profiles={siteProfiles(site.members)} />
                    </div>
                </Link>
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