"use client"
import TicketList from "../_components/ticket-list";
import { Suspense } from "react";

const TicketsPage = () => {

    return ( 
        <div>
            <div id="title" className="text-3xl">Support tickets</div>
            {/* <Suspense fallback={<Loading />}> */}
            <TicketList />
            {/* </Suspense> */}
        </div>
     );
}
 
export default TicketsPage;