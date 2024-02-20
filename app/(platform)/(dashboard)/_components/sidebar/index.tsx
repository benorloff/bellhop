"use client";

import Link from "next/link";

// BACKLOG: Use localStorage to store open/collapsed state of sidebar
// import { useLocalStorage } from "usehooks-ts";
import { NavItem } from "./nav-item";
import { Wrapper } from "./wrapper";
import { Toggle } from "./toggle";
import { Navigation } from "./navigation";

interface SidebarProps {
    storageKey?: string;
};

export const Sidebar = ({
    storageKey,
}: SidebarProps) => {

    return (
        <Wrapper>
            <Toggle />
            <Navigation />
        </Wrapper>
    );
};