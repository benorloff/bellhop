"use client"
import TicketList from "../_components/ticket-list";

const TicketsPage = () => {

    return ( 
        <div>
            <div id="title" className="text-3xl">Support tickets</div>
            <TicketList />
        </div>
     );
}
 
export default TicketsPage;