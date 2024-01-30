import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

interface SiteIdPageProps {
    params: {
        siteId: string;
    };
};

const SiteIdPage = async ({
    params,
}: SiteIdPageProps) => {

    const site = await db.site.findUnique({
        where: {
            id: params.siteId,
        },
    });

    return (
        <div>
            <div>
                <div className="mb-8">
                    <div className="text-3xl">{site?.name}</div>
                    <div>{site?.url}</div>
                </div>
                <p>Name: {site?.name}</p>
                <p>URL: {site?.url}</p>
                <p>Slug: {site?.slug}</p>
                <p>Org ID: {site?.orgId}</p>
                <p>User ID: {site?.userId}</p>
            </div>
            <div className="flex flex-row flex-wrap">
                <div className="flex flex-col basis-full lg:basis-2/3">
                    <div className="border border-black rounded-sm p-4">
                        <div className="text-xl mb-4">Tickets</div>
                        {/* Ticket List component goes here. */}
                    </div>
                </div>
                <div className="flex flex-col basis-full lg:basis-1/3">
                    <div className="border border-black rounded-sm p-4">
                        <div className="text-xl mb-4">Users</div>
                    </div>
                    <div className="border border-black rounded-sm p-4">
                        <div className="text-xl mb-4">IP Address</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SiteIdPage;