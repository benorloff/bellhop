"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import Link from "next/link";

export const CreateSiteButton = () => {
    const { onOpen } = useModal();

    return (
        <Link href="/migration">
            <Button
            >
                <Plus className="h-4 w-4 mr-2" />
                Add Site
            </Button> 
        </Link>
    )
};