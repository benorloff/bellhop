import { FormInput } from "@/components/form/form-input";
import { SiteNav } from "@/components/sites/site-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

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
                <CardDescription
                    className="border-b py-2 px-6"
                >
                    {/* TODO: Store state and connect these buttons */}
                    <div className="flex flex-row gap-4 items-center">
                        <Button variant="ghost">Members</Button>
                        <Button variant="ghost">Invitations</Button>
                    </div>
                </CardDescription>
                <CardContent
                    className="p-6"
                >
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