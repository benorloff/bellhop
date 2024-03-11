import { Skeleton } from "@/components/ui/skeleton"
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card"

const BillingPageLoading = () => {
    return (
        <>
            <div className="items-start justify-center gap-6 grid grid-cols-1 lg:grid-cols-2 mb-6">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className="w-32 h-6" />
                        </CardTitle>
                        <CardDescription>
                            <Skeleton className="w-32 h-4" />
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="w-full h-4" />
                    </CardContent>
                    <CardFooter className="flex flex-row items-center justify-between">
                        <Skeleton className="w-32 h-4" />
                        <Skeleton className="w-24 h-10" />
                    </CardFooter>
                </Card>
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className="w-32 h-6" />
                        </CardTitle>
                        <CardDescription>
                            <Skeleton className="w-32 h-4" />
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-row items-center gap-4 w-full border p-4 rounded-md">
                            <Skeleton className="w-[75px] h-[47px]" />
                            <div className="grow">
                                <Skeleton className="w-32 h-6" />
                            </div>
                            <Skeleton className="w-20 h-10" />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <Skeleton className="w-32 h-6" />
                    </CardTitle>
                    <CardDescription>
                        <Skeleton className="w-32 h-4" />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Skeleton className="w-full h-60" />
                </CardContent>
            </Card>
        </>
    )
};

export default BillingPageLoading;