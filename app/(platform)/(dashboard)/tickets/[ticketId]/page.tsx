const TicketIdPage = ({
    params,
}: {
    params: { ticketId: string}
}) => {
    return (
        <div>
            Ticket ID: {params.ticketId}
        </div>
    );
};

export default TicketIdPage;