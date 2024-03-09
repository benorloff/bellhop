import { Skeleton } from "@/components/ui/skeleton"
import { number } from "zod";

const SiteTicketsLoading = () => {
    const numberOfRows = 10;

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
                <h3 className="text-2xl font-semibold tracking-tight">Tickets</h3>
                <Skeleton className="w-[125px] h-10" />
            </div>
            <div>
                <div className="flex items-center justify-between py-4">
                    <div className="flex flex-1 items-center space-x-2">
                        <Skeleton className="h-8 w-[150px] lg:w-[250px] rounded-md" />
                        <Skeleton className="h-8 w-[100px] rounded-md border-dashed"/>
                    </div>
                </div>
            </div>
            <div className="border rounded-md">
                <div className="relative w-full">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="border-b">
                            <tr className="border-b">
                                <th className="h-12 w-1/5 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Status
                                </th>
                                <th className="h-12 w-2/5 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Subject
                                </th>
                                <th className="h-12 w-2/5 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Last Updated
                                </th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {Array(numberOfRows).fill(1).map((row) => (
                                <tr key={row} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted" data-state="false">
                                    <td className="p-4 align-middle">
                                        <Skeleton className="h-[22px] w-[75px] rounded-full" />
                                    </td>
                                    <td className="p-4 align-middle">
                                        <Skeleton className="h-[22px] w-3/4 rounded-full" />
                                    </td>
                                    <td className="p-4 align-middle">
                                        <Skeleton className="h-[22px] w-3/4 rounded-full" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>          
    )
};

export default SiteTicketsLoading;