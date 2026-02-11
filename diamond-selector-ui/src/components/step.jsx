import React from "react";

export const diamondIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M6 3L3 8L12 21L21 8L18 3H6Z" />
        <path d="M3 8H21" />
    </svg>
);

export const settingIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="6" />
        <path d="M12 6V2M12 22v-4M6 12H2m20 0h-4" />
    </svg>
);

export const ringIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="14" r="7" />
        <path d="M12 7V3M10 3h4" />
    </svg>
);

export const baseSteps = [
    { id: 1, title: "Select Diamond", subtitle: "Choose Your Diamond", icon: diamondIcon, link: "/stones" },
    { id: 2, title: "Select Setting", subtitle: "Choose Your Setting", icon: settingIcon, link: "/settings" },
    { id: 3, title: "Complete Ring", subtitle: "Review Your Design", icon: ringIcon, link: "/complete-ring" },
];
