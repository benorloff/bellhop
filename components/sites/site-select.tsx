"use client"

import { Site } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState } from "react";

interface SiteSelectProps {
    sites: Site[];
}

export const SiteSelect = ({ sites }: SiteSelectProps) => {

    const [site, setSite] = useState<string>("");

    const handleChange = (value: string) => {
        console.log(value, "value");
        setSite(value);
    }

    useEffect(() => {
        console.log(site, "site");
    }, [site])

    return (
        <>
            <Select onValueChange={handleChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a site" />
                </SelectTrigger>
                <SelectContent>
                    {sites.map((site) => (
                        <SelectItem key={site.id} value={site.id}>
                            {site.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            Site ID: {site}
        </>
    )
};