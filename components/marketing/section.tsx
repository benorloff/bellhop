export const Section = ({ 
    children 
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="flex flex-col gap-8 py-32 justify-center items-center text-center">
                {children}
        </div>
    );
}