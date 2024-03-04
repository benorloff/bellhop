interface DashboardTitleProps {
    title: string;
}

export const DashboardTitle = ({
    title,
}: DashboardTitleProps) => {
    return (
        <div className="text-3xl mb-8">
            {title}
        </div>
    );
}