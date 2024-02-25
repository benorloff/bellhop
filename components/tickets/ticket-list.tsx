import Link from 'next/link';
import { Ticket } from '@/types/index'

import { currentUser } from '@clerk/nextjs';
import { DataTable } from '@/components/tickets/data-table';
import { columns } from '@/components/tickets/columns';

import { 
  zendeskApiHost, 
  zendeskApiPassword, 
  zendeskApiUsername 
} from '@/constants/tickets';

async function getData() {

  const user = await currentUser();
  
  const response = await fetch(
    `${zendeskApiHost}/tickets?sort_by=updated_at&sort_order=desc`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(`${zendeskApiUsername}:${zendeskApiPassword}`)}`, 
      },
      next: {
        tags: ['tickets'],
      }
  })
 
  if (!response.ok) {
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