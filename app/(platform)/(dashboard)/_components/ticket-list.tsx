import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Ticket } from '@/types/index'


const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_FRESHDESK_KEY;
    const ticketURL = process.env.NEXT_PUBLIC_FRESHDESK_API_URL;
  
  
  
    const fetchData = async () => {
      try {
        console.log(apiKey)
        const response = await axios.get(`${ticketURL}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa(`${apiKey}:x`)}`, // Using basic authentication
          },
        });
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <table className="w-full border-collapse mt-8">
        <thead>
          <tr>
            <th className="border p-2">Status</th>
            <th className="border p-2">Ticket</th>
            <th className="border p-2">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket: Ticket) => (
            <tr key={ticket.id}>
              <td className="border p-2">{ticket.status}</td>
              <td className="border p-2"> 
                {/* Use Link component for navigation to the single ticket page */}
                <Link href={`/tickets/${ticket.id}`}>
                  {ticket.subject}
                </Link></td>
              <td className="border p-2">{new Date(ticket.updated_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;