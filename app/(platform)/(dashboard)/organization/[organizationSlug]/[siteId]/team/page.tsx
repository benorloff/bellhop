import { Hint } from "@/components/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { db } from "@/lib/db";
import { MenuIcon, MoreHorizontal } from "lucide-react";

interface SiteTeamPageProps {
    params: {
        siteId: string;
    }
};

const SiteTeamPage = async ({
    params
}: SiteTeamPageProps) => {

    const members = await db.member.findMany({
        where: {
            siteId: params.siteId,
        }, 
        include: {
            profile: true,
        }
    })

    return (
        <div className="flex flex-col gap-4">
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
                    <CardTitle>Team Members</CardTitle>
                </CardHeader>
                <CardDescription>

                </CardDescription>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        {members.map((member) => (
                            <div key={member.id} className="flex flex-row gap-4 items-center">
                                <Avatar>
                                    <AvatarImage src={member.profile.imageUrl} alt={member.profile.firstName} />
                                    <AvatarFallback>{member.profile.firstName[0]}{member.profile.lastName[0]}</AvatarFallback>
                                </Avatar>
                                <div className="grow">
                                    <div>{member.profile.firstName} {member.profile.lastName}</div>
                                    <div className="text-sm">{member.profile.email}</div>
                                </div>
                                <div>
                                    {member.role}
                                </div>
                                <Popover>
                                    <PopoverTrigger>
                                        <Button
                                            className="rounded-full h-10 w-10 p-1"
                                            variant="ghost"
                                        >
                                            <MoreHorizontal />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        side="top"
                                        align="end"
                                        className="max-w-[150px]"
                                    >
                                        <div className="flex flex-col gap-4">
                                            <Button variant="destructive">Remove</Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                                
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SiteTeamPage;