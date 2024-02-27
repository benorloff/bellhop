"use client";

import { OrganizationList } from "@clerk/nextjs";

import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function CreateOrganizationPage() {
    const { theme } = useTheme();
    return (
        <OrganizationList 
            hidePersonal
            afterSelectOrganizationUrl="/organization/:slug"
            afterCreateOrganizationUrl="/organization/:slug"
            appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
            }}
        />
    )
}