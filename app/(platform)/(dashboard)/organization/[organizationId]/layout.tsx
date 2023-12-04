import { OrgControl } from "./_components/org-control";

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