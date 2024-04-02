export const FullScreenHeroSection = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            <div className="flex flex-col items-center justify-center max-w-3xl text-center gap-4">
                {children}
            </div>
        </section>
    )
}