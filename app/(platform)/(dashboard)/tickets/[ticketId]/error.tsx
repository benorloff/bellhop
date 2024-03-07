"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const TicketPageError = ({
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
            <div className="text-3xl mb-8">Oops, something went wrong.</div>
            <div>Error: {error.message}</div>
        </div>
    )
};

export default TicketPageError;