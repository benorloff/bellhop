import Link from 'next/link';
import { Ticket } from '@/types/index'

import { auth, currentUser, redirectToSignIn } from '@clerk/nextjs';
import { DataTable } from '@/components/tickets/data-table';
import { columns } from '@/components/tickets/columns';

import { 
  zendeskApiHost, 
  zendeskApiPassword, 
  zendeskApiUsername 
} from '@/constants/tickets';

async function getData() {

  const user = await currentUser();

  if (!user) {
    redirectToSignIn();
    return;
  }
  
  const response = await fetch(
    `${zendeskApiHost}/users/${user.privateMetadata?.zendeskUserId}/tickets/requested?sort_by=updated_at&sort_order=desc`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(`${zendeskApiUsername}:${zendeskApiPassword}`)}`, 
      },
      next: {
        tags: ['tickets'],
      }
  })
 
  if (!response.ok) {
    console.log(response, '<-- response')
    throw new Error('Failed to fetch data')
  }
 
  return response.json()
}

export default async function TicketList() {
  const { tickets } = await getData(); 
 
  return  (
    <div>
      <DataTable columns={columns} data={tickets} />
    </div>
  );
}