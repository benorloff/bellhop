import { Button } from "@/components/ui/button";
import TicketList from "@/components/tickets/ticket-list";
import { Suspense } from "react";
import Link from "next/link";
import { useModal } from "@/hooks/use-modal-store";
import { CreateTicketButton } from "@/components/tickets/create-ticket-button";
import { currentOrgSites } from "@/lib/current-org-sites";
import { DashboardTitle } from "@/components/dashboard-title";
import { Site } from "@prisma/client";

const TicketsPage = async () => {    

    const sites = await currentOrgSites();

    return ( 
        <div>
            <div className="flex justify-between items-start">
                <DashboardTitle/>
                <CreateTicketButton sites={sites as Site[]}/>
            </div>
            {/* <Suspense fallback={<Loading />}> */}
            <TicketList />
            {/* </Suspense> */}
        </div>
     );
}
 
export default TicketsPage;