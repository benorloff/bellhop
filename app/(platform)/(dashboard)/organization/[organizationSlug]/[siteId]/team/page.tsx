import { db } from "@/lib/db";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getSite } from "@/lib/get-site";
import { auth, clerkClient } from "@clerk/nextjs";
import { MoreHorizontal } from "lucide-react";
import { InviteButton } from "../../_components/invite-button";

interface SiteTeamPageProps {
    params: {
        siteId: string;
    }
};

const SiteTeamPage = async ({
    params
}: SiteTeamPageProps) => {
    const { userId, orgId } = auth();

    if (!userId || !orgId ) {
        throw new Error ("Unauthorized");
    };

    const members = await db.member.findMany({
        where: {
            siteId: params.siteId,
        }
    });

    const site = await getSite(params.siteId);

    const organizationId = orgId;
    const orgMembers = await clerkClient.organizations.getOrganizationMembershipList({ organizationId });
    const parsedOrgMembers = await JSON.parse(JSON.stringify(orgMembers));

    const invitations = await db.invite.findMany({
        where: {
            siteId: params.siteId,
            expiresAt: {
                gt: new Date(),
            }
        },
        orderBy: [
            {
                createdAt: "desc",
            }
        ]
    });

    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardHeader
                    className="border-b"
                >
                    <CardTitle>
                        <div className="flex flex-row justify-between items-center">
                            <div>Team Members</div>
                            <InviteButton siteId={params.siteId} siteName={site?.name!}/>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent
                    className="p-6"
                >
                    <Tabs defaultValue="members">
                        <TabsList className="flex flex-row justify-center items-center w-full mb-6">
                            <TabsTrigger 
                                value="members"
                                className="w-full"
                            >
                                Members
                            </TabsTrigger>
                            <TabsTrigger 
                                value="invitations"
                                className="w-full"
                            >
                                Invitations
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="members">
                            <div className="flex flex-col gap-4">
                                {members.map((member) => (
                                    <div key={member.userName} className="flex flex-row flex-wrap gap-4 items-center">
                                        <Avatar>
                                            <AvatarImage src={member.userImage} alt={member.userName} />
                                            <AvatarFallback>{member.userName[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="grow">
                                            <div>{member.userName}</div>
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
                        </TabsContent>
                        <TabsContent value="invitations">
                            <div className="flex flex-col gap-4">
                                {invitations.length !== 0 ? 
                                    (invitations.map((invite) => (
                                        <div key={invite.id} className="flex flex-row flex-wrap gap-4 items-center">
                                            <Avatar>
                                                <AvatarFallback>{invite.recipientEmail[0].toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div className="grow">
                                                <div>{invite.recipientEmail}</div>
                                            </div>
                                            <div>
                                                Pending
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
                                                        {/* TODO: Add revoke invitatino action */}
                                                        <Button variant="destructive">Revoke</Button>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    ))) : (
                                        <div className="text-center py-8">No pending invitations.</div>
                                    )
                                }
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

export default SiteTeamPage;