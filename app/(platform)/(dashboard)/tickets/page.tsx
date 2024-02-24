import { Button } from "@/components/ui/button";
import TicketList from "@/components/tickets/ticket-list";
import { Suspense } from "react";
import Link from "next/link";
import { useModal } from "@/hooks/use-modal-store";
import { CreateTicketButton } from "@/components/tickets/create-ticket-button";
import { currentOrgSites } from "@/lib/current-org-sites";

const TicketsPage = async () => {    

    const sites = await currentOrgSites();

    return ( 
        <div>
            <div className="flex justify-between items-center">
                <div id="title" className="text-3xl">Support tickets</div>
                <CreateTicketButton sites={sites}/>
            </div>
            {/* <Suspense fallback={<Loading />}> */}
            <TicketList />
            {/* </Suspense> */}
        </div>
     );
}
 
export default TicketsPage;