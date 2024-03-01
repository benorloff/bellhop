import { DataTable } from '@/components/tickets/data-table';
import { columns } from '@/components/tickets/columns';
import { 
  zendeskApiHost,
  zendeskApiPassword,
  zendeskApiUsername, 
} from "@/constants/tickets";
import { getSite } from '@/lib/get-site';

interface SiteTicketsPageProps {
    params: {
        siteId: string;
        organizationSlug: string;
    }
};

const SiteTicketsPage = async ({
  params
}: SiteTicketsPageProps) => {

  const site = await getSite(params.siteId);

  const query = new URLSearchParams({
      query: `type:ticket custom_field_23229752282907:${site?.id}`,
      sort_by: "updated_at",
      sort_order: "desc",
  });

  const getSiteTickets = async () => {

      let tickets;

      try {
          const response = await fetch(`${zendeskApiHost}/search?${query}`, {
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${btoa(`${zendeskApiUsername}:${zendeskApiPassword}`)}`,
              }, 
              next: {
                tags: ['tickets'],
              },
          });
          tickets = await response.json();
      } catch (error) {
          return {
              error: "Failed to get site tickets."
          }
      }

      return tickets;
  };

  const { results } = await getSiteTickets();

  return (
    <div>
      <DataTable columns={columns} data={results} />
    </div>
  )
}
  
export default SiteTicketsPage;