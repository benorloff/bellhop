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
            <div className="mb-8">
                <div className="text-3xl">{site?.name}</div>
                <div>{site?.url}</div>
            </div>
            {/* Menu placeholder. Need to abstract. */}
            <div className="flex flex-row gap-8 mb-8">
                <div>Overview</div>
                <div>Tickets</div>
                <div>Team</div>
                <div>Settings</div>
            </div>
            <div className="flex flex-row flex-wrap gap-8">
                <div className="flex flex-col basis-full lg:basis-2/3 gap-8">
                    <div className="bg-white rounded-sm p-4 shadow">
                        <div className="text-xl mb-4">Tickets</div>
                        {/* Ticket List component goes here. */}
                    </div>
                </div>
                <div className="flex flex-col grow basis-auto gap-8">
                    <div className="bg-white rounded-sm p-4 shadow">
                        <div className="text-xl mb-4">Team</div>
                    </div>
                    <div className="bg-white rounded-sm p-4 shadow">
                        <div className="text-xl mb-4">IP Address</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SiteIdPage;