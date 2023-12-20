import { startCase } from "lodash";
import { auth } from "@clerk/nextjs";

import { OrgControl } from "./_components/org-control";

// Add org name to page title
export async function generateMetadata() {
    const { orgSlug } = auth();

    return {
        title: startCase(orgSlug || "Organization")
    }
};

const OrganizationLayout = ({ 
    children 
}: {
    children: React.ReactNode;
}) => {
    return (
        <>
            <OrgControl />
            {children}
        </>
    );
};

export default OrganizationLayout;