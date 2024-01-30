import { Button } from "@/components/ui/button";
import TicketList from "../_components/ticket-list";
import { Suspense } from "react";
import Link from "next/link";

const TicketsPage = () => {

    return ( 
        <div>
            <div className="flex justify-between items-center">
                <div id="title" className="text-3xl">Support tickets</div>
                <Button asChild>
                    <Link href="/tickets/new">
                        Open a ticket
                    </Link>
                </Button>
            </div>
            {/* <Suspense fallback={<Loading />}> */}
            <TicketList />
            {/* </Suspense> */}
        </div>
     );
}
 
export default TicketsPage;