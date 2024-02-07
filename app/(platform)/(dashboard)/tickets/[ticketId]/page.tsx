interface TicketIdPageProps {
    params: {
        ticketId: string;
    };
};

const TicketIdPage =  ({
    params
}: TicketIdPageProps) => {

    console.log(params.ticketId, "<-- params.ticketId from TicketIdPage")
    // const ticket = await fetch(`/api/tickets/${params.ticketId}`).then((res) => res.json());
    return (
        <div>
            Ticket ID: {params.ticketId}
        </div>
    );
};

export default TicketIdPage;