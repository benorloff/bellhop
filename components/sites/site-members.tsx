import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Profile } from "@prisma/client";

interface SiteMembersProps {
    profiles: Profile[];
};

export const SiteMembers = ({
    profiles
}: SiteMembersProps) => {
    return (
        <>
            {profiles.map((profile) => (
                <Avatar key={profile.id}>
                    <AvatarImage src={profile.imageUrl} alt={profile.firstName} />
                    <AvatarFallback>{profile.firstName[0]}{profile.lastName[0]}</AvatarFallback>
                </Avatar>
            ))}
        </>
    )
};