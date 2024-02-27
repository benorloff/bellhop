import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const SiteTeamPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="text-2xl">Team</div>
            <Card>
                <CardHeader>
                    <CardTitle>Invite people</CardTitle>
                </CardHeader>
                <CardContent>
                    Invite form goes here.
                </CardContent>
                <CardFooter>
                    <Button>Invite</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Site Members</CardTitle>
                </CardHeader>
                <CardContent>
                    Member list goes here.
                </CardContent>
            </Card>
        </div>
    );
};

export default SiteTeamPage;