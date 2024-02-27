import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentGreeting } from "@/lib/current-greeting";

const DashboardPage = async () => {

    const greeting = await currentGreeting();

    return ( 
        <div className="flex flex-col gap-4">
            <div className="text-3xl mb-8">{greeting}</div>
            <div className="flex flex-row gap-4">
                <Card className="grow">
                    <CardHeader>Site</CardHeader>
                    <CardContent>Content goes here.</CardContent>
                </Card>
                <Card className="grow">
                    <CardHeader>Site</CardHeader>
                    <CardContent>Content goes here.</CardContent>
                </Card>
                <Card className="grow">
                    <CardHeader>Site</CardHeader>
                    <CardContent>Content goes here.</CardContent>
                </Card>
            </div>
        </div>
     );
}
 
export default DashboardPage;