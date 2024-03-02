import { db } from "@/lib/db";

import { FormInput } from "@/components/form/form-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

import { MoreHorizontal } from "lucide-react";

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

    const invitations = await db.invite.findMany({
        where: {
            siteId: params.siteId,
        },
        include: {
            profile: true,
        },
    });

    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Invite people</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* This is a placeholder for the form to invite people to the site. */}
                    <FormInput 
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="bella@bellhop.com"
                    />
                </CardContent>
                <CardFooter>
                    <Button>Invite</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader
                    className="border-b"
                >
                    <CardTitle>Team Members</CardTitle>
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
                                    <div key={member.id} className="flex flex-row flex-wrap gap-4 items-center">
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
                        </TabsContent>
                        <TabsContent value="invitations">
                            {invitations.map((invite) => (
                                <div key={invite.id} className="flex flex-row flex-wrap gap-4 items-center mb-4 border p-4 rounded-sm">
                                    <div className="flex flex-row gap-4 items-center grow">
                                        <Avatar>
                                            <AvatarFallback>{invite.recipientEmail[0].toUpperCase()}</AvatarFallback>
                                        </Avatar>
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
                            ))}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

export default SiteTeamPage;