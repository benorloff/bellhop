"use client";

import Link from "next/link";

// NOTE: We will use localStorage to store open/collapsed state of sidebar
import { useLocalStorage } from "usehooks-ts";
import { NavItem } from "./nav-item";

interface SidebarProps {
    storageKey?: string;
};

export const Sidebar = ({
    storageKey,
}: SidebarProps) => {
    return (
        <div>
            <NavItem />
        </div>
    );
};