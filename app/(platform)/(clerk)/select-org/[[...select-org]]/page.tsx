import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrganizationPage() {
    return (
        <OrganizationList 
            hidePersonal
            afterSelectOrganizationUrl="/organization/:slug"
            afterCreateOrganizationUrl="/organization/:slug"
        />
    )
}