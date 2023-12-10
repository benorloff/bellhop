import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Ticket } from '../../../../types/index'



const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const freshdeskApiUrl = 'https://bellhop.freshdesk.com/api/v2/tickets';
        const apiKey = 's0poIM6dZpKt4nyhVcDf';

        const response = await axios.get(freshdeskApiUrl, {
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
              <td className="border p-2">{ticket.subject}</td>
              <td className="border p-2">{new Date(ticket.updated_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;