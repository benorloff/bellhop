import { Logo } from "@/components/logo";

export const Navbar = () => {
    return (
        <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
            {/* TODO: Mobile Sidebar */}
            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex">
                    <Logo />
                </div>
            </div>
        </nav>
    )
};