import Link from 'next/link';
import { Ticket } from '@/types/index'

import { currentUser } from '@clerk/nextjs';

const apiKey = process.env.NEXT_PUBLIC_FRESHDESK_KEY;
const ticketURL = process.env.NEXT_PUBLIC_FRESHDESK_API_URL;

async function getData() {
  const user = await currentUser();
  
  const response = await fetch(`${ticketURL}?email=${user?.emailAddresses[0].emailAddress}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${apiKey}:x`)}`, 
    },
  })
 
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return response.json()
}

export default async function TicketList() {
  const data = await getData();
 
  return  (
    <div>
      <table className="w-full border-collapse mt-8 border-none">
        <thead>
          <tr>
            <th className="p-2">Status</th>
            <th className="p-2">Ticket</th>
            <th className="p-2">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ticket: Ticket) => (
            <tr key={ticket.id} className='rounded-lg bg-[#FFFFFF] py-2'>
              <td className="p-2">{ticket.status}</td>
              <td className="p-2"> 
                {/* Use Link component for navigation to the single ticket page */}
                <Link href={`/tickets/${ticket.id}`}>
                  {ticket.subject}
                </Link>
              </td>
              <td className="p-2">{new Date(ticket.updated_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}