"use client";

import Link from "next/link";

// BACKLOG: Use localStorage to store open/collapsed state of sidebar
// import { useLocalStorage } from "usehooks-ts";
import { NavItem } from "./nav-item";
import { Wrapper } from "./wrapper";
import { Toggle } from "./toggle";
import { Navigation } from "./navigation";
import { Footer } from "./footer";
import { useTheme } from "next-themes";

interface SidebarProps {
    storageKey?: string;
};

export const Sidebar = ({
    storageKey,
}: SidebarProps) => {
    const { theme } = useTheme();
    return (
        <Wrapper>
            <Toggle />
            <Navigation />
            <Footer />
        </Wrapper>
    );
};