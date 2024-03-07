import { AuditLog } from "@prisma/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";

interface ActivityListProps {
    activities: AuditLog[];
    limit?: number;
};

export const ActivityList = ({
    activities,
    limit,
}: ActivityListProps) => {

    if (activities.length === 0) {
        return (
            <div>No activity yet.</div>
        )
    }

    if (limit) {
        return (
            <>
                {activities.map((activity: AuditLog, index: number) => {
                    if (index < limit) (
                        <div key={activity.id} className="flex flex-row justify-between items-center gap-4 mb-4">
                            <Avatar>
                                <AvatarImage src={activity.userImage} alt={activity.userName} />
                                <AvatarFallback>{activity.userName[0]}</AvatarFallback>
                            </Avatar>
                            <div className="grow">{`${activity.userName} ${activity.action.toLowerCase()}d a ${activity.entityType.toString()}`}</div>
                            <div className="shrink">{new Date(activity.createdAt).toLocaleString()}</div>
                        </div>
                    )
                })}
            </>
        )
    }

    return (
        <>
            {activities.map((activity: AuditLog) => (
                <div key={activity.id} className="flex flex-row justify-between items-center gap-4 mb-4">
                    <Avatar>
                        <AvatarImage src={activity.userImage} alt={activity.userName} />
                        <AvatarFallback>{activity.userName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="grow">{`${activity.userName} ${activity.action.toLowerCase()}d a ${activity.entityType.toString()}`}</div>
                    <div className="shrink">{new Date(activity.createdAt).toLocaleString()}</div>
                </div>
            ))}
        </>
    )
} 

ActivityList.Skeleton = function SkeletonActivityList() {
    return (
        <>
            <div className="flex flex-row gap-4 justify-between items-center border rounded-sm p-4 mb-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-6 grow" />
                <Skeleton className="h-6 w-[150px]" />
            </div>
            <div className="flex flex-row gap-4 justify-between items-center border rounded-sm p-4 mb-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-6 grow" />
                <Skeleton className="h-6 w-[150px]" />
            </div>
            <div className="flex flex-row gap-4 justify-between items-center border rounded-sm p-4 mb-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-6 grow" />
                <Skeleton className="h-6 w-[150px]" />
            </div>
        </>
        
    )
}