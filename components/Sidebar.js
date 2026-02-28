"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    const links = [
        { href: "/", label: "home" },
        { href: "/projects", label: "projects" },
        { href: "/books", label: "books" },
        { href: "/blog", label: "blog" },
        { href: "/fish", label: "fish" },
    ];

    function toggleTheme() {
        const root = document.documentElement;
        if (darkMode) {
            root.style.setProperty("--foreground-color", "40,40,40");
            root.style.setProperty("--background-color", "245,240,230");
        } else {
            root.style.setProperty("--foreground-color", "235,230,220");
            root.style.setProperty("--background-color", "30,30,35");
        }
        setDarkMode(!darkMode);
    }

    function toggleMobile() {
        setMobileOpen(!mobileOpen);
    }

    // Close mobile menu on resize to desktop
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 768) setMobileOpen(false);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <aside className="left-aside">
                {/* Desktop nav */}
                <ul id="menu">
                    {links.map((link) => (
                        <li key={link.href} className={pathname === link.href ? "active" : ""}>
                            <Link href={link.href}>
                                {link.href === "/" ? <h3>{link.label}</h3> : link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile hamburger icon */}
                <div id="mobile-menu-icon" onClick={toggleMobile}>
                    {mobileOpen ? "x" : "≡"}
                </div>

                {/* Mobile nav */}
                {mobileOpen && (
                    <div id="mobile-menu">
                        {links.map((link) => (
                            <p key={link.href} onClick={() => setMobileOpen(false)}>
                                <Link href={link.href}>{link.label}</Link>
                            </p>
                        ))}
                    </div>
                )}
            </aside>

            {/* Theme toggle */}
            <div id="theme-toggle" className="toggle" onClick={toggleTheme}>
                {darkMode ? "◐" : "◑"}
            </div>
        </>
    );
}
