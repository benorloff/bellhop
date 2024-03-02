import { Skeleton } from "@/components/ui/skeleton"
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card"

const SiteTeamLoading = () => {
    return (
        <Card>
            <CardHeader
                className="border-b"
            >
                <CardTitle>
                    <div className="flex flex-row justify-between items-center">
                        <Skeleton className="w-1/5 h-10" />
                        <Skeleton className="w-1/5 h-10" />
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent
                className="p-6"
            >
                <Skeleton className="w-full h-8 mb-6"/>
                <div className="flex flex-row flex-wrap gap-4 items-center justify-between mb-6"> 
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-10 grow"/>
                </div>
                <div className="flex flex-row flex-wrap gap-4 items-center justify-between mb-6"> 
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-10 grow"/>
                </div>
                <div className="flex flex-row flex-wrap gap-4 items-center justify-between"> 
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-10 grow"/>
                </div>
            </CardContent>
        </Card>
    )
};

export default SiteTeamLoading;