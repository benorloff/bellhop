interface TicketIdPageProps {
    params: {
        ticketId: string;
    };
};

async function getTicket({ params 
}: TicketIdPageProps) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FRESHDESK_API_URL}/${params.ticketId}?include=conversations`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa(`${process.env.NEXT_PUBLIC_FRESHDESK_KEY}:x`)}`,
        }
    })
    const data = await res.json();

    return data;
}

const TicketIdPage =  async ({
    params
}: TicketIdPageProps) => {

    const ticket = await getTicket({ params });

    console.log(ticket, "<-- ticket from TicketIdPage")
    console.log(ticket.conversations, "<-- ticket.conversations from TicketIdPage")
    // const ticket = await fetch(`/api/tickets/${params.ticketId}`).then((res) => res.json());
    return (
        <div>
            Ticket ID: {params.ticketId}
        </div>
    );
};

export default TicketIdPage;