import { Settings } from "lucide-react";
import { NavItem } from "./nav-item";

export const Footer = () => {
    return (
        <div className="flex grow px-2 items-end mb-20">
            <NavItem
                    key="/settings"
                    label="Settings"
                    icon={Settings}
                    href="/settings"
                />
        </div>
    );
};

