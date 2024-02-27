"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const Error = ({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) => {
    useEffect(() => {
        console.log(error);
    }, [error]);

    return (
        <div className="flex flex-col gap-4">
            <div className="text-3xl">Something went wrong!</div>
            <div>
                <Button
                    // Attempt to recover by trying to re-render the segment
                    onClick={() => reset()}
                >
                    Try again
                </Button>
            </div>
        </div>
    )
};

export default Error;