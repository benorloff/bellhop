import { Member } from "@prisma/client"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarGroupProps {
    members: Member[];
    limit?: number;
};

export const AvatarGroup = ({
    members,
    limit,
}: AvatarGroupProps) => {
    return (
        <div className="max-w-full py-4 px-2 w-full h-full overflow-x-visible">
            <div className="flex items-center justify-center h-auto w-max" role="group">
                {members.map((member, index) => (
                    <Avatar 
                        className={cn(
                            "flex relative justify-center items-center box-border overflow-hidden align-middle -ms-2 ring-2 ring-foreground ring-offset-2 ring-offset-background transition-transform",
                            index === 0 && "ms-0",
                            members.length > 1 && "hover:-translate-x-3" ,
                            )}>
                        <AvatarImage src={member.userImage} alt={member.userName} />
                        <AvatarFallback>{member.userName[0]}</AvatarFallback>
                    </Avatar>
                ))}
            </div>
        </div>
    )
}