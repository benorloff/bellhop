import Link from 'next/link';
import { Ticket } from '@/types/index'

import { currentUser } from '@clerk/nextjs';
import { DataTable } from '@/components/tickets/data-table';
import { columns } from '@/components/tickets/columns';

const url = process.env.NEXT_PUBLIC_ZENDESK_API_TICKET_URL;
const username = process.env.NEXT_PUBLIC_ZENDESK_USERNAME;
const password = process.env.NEXT_PUBLIC_ZENDESK_PASSWORD;

async function getData() {

  const user = await currentUser();
  
  const response = await fetch(
    `${url}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(`${username}:${password}`)}`, 
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
  console.log(tickets, '<-- tickets fetch data')
 
  return  (
    <div>
      <DataTable columns={columns} data={tickets} />
    </div>
  );
}