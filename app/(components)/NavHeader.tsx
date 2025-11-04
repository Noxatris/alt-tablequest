"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type MenuItem = {
    title: string;
    href?: string;
    children?: MenuItem[];
};

const menu: MenuItem[] = [
    {
        title: "Aventure en cours",
        children: [
            { title: "Vue d’ensemble", href: "/aventure-en-cours" },
            { title: "Personnages", href: "/aventure-en-cours/personnages" },
            { title: "Partie 1", href: "/aventure-en-cours/partie1" },
            { title: "Partie 2", href: "/aventure-en-cours/partie2" },
        ],
    },
    {
        title: "Aventure précédente",
        children: [
            { title: "Saison 1", href: "/aventure-precedente/saison1" },
            { title: "Saison 2", href: "/aventure-precedente/saison2" },
        ],
    },
    { title: "Partenaires", href: "/partenaires" },
    { title: "FAQ", href: "/faq" },
    {
        title: "Podcast",
        children: [
            { title: "Deezer", href: "/podcast/deezer" },
            { title: "Spotify", href: "/podcast/spotify" },
        ],
    },
];

export default function NavMenu() {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleSubMenu = (title: string) => {
        setOpenMenu(openMenu === title ? null : title);
    };

    return (
        <nav
            aria-label="Navigation principale"
            className="font-[cinzel] text-gray-300 font-bold"
        >
            <div className="max-w-7xl mx-auto px-4">
                {/* Barre supérieure */}
                <div className="flex items-center justify-between h-16">

                    {/* Bouton mobile */}
                    <button
                        className="md:hidden p-2 rounded hover:bg-gray-100"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Ouvrir le menu"
                    >
                        {mobileOpen ? "✕" : "☰"}
                    </button>

                    {/* Menu Desktop */}
                    <ul className="hidden md:flex space-x-8">
                        {menu.map((item) => (
                            <li key={item.title} className="relative group">
                                {item.children ? (
                                    <>
                                        <button
                                            onMouseEnter={() => setOpenMenu(item.title)}
                                            onMouseLeave={() => setOpenMenu(null)}
                                            aria-haspopup="true"
                                            aria-expanded={openMenu === item.title}
                                            className="flex items-center gap-1 hover:text-yellow-600 transition-colors"
                                        >
                                            {item.title}
                                            <span className="text-xs">▼</span>
                                        </button>

                                        {/* Sous-menu avec animation */}
                                        <AnimatePresence>
                                            {openMenu === item.title && (
                                                <motion.ul
                                                    key={item.title}
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.15, ease: "easeOut" }}
                                                    className="absolute left-0 mt-2 backdrop-blur-sm border border-gray-200 rounded-md shadow-lg w-44 z-50"
                                                    onMouseEnter={() => setOpenMenu(item.title)}
                                                    onMouseLeave={() => setOpenMenu(null)}
                                                >
                                                    {item.children.map((child) => (
                                                        <li key={child.title}>
                                                            <Link
                                                                href={child.href || "#"}
                                                                className="block p-4 hover:text-yellow-400 text-sm"
                                                            >
                                                                {child.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </motion.ul>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <Link
                                        href={item.href || "#"}
                                        className="hover:text-yellow-600 transition-colors"
                                    >
                                        {item.title}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Menu mobile plein écran */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            key="mobileMenu"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-start p-6 overflow-y-auto"
                        >
                            <div className="flex justify-between w-full mb-6">
                                <Link
                                    href="/"
                                    className="text-xl font-semibold tracking-tight"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Nom du site
                                </Link>
                                <button
                                    className="text-2xl"
                                    onClick={() => setMobileOpen(false)}
                                    aria-label="Fermer le menu"
                                >
                                    ✕
                                </button>
                            </div>

                            <ul className="w-full space-y-4">
                                {menu.map((item) => (
                                    <li key={item.title} className="w-full">
                                        {item.children ? (
                                            <>
                                                <button
                                                    onClick={() => toggleSubMenu(item.title)}
                                                    className="flex justify-between w-full text-left text-lg font-medium hover:text-blue-600"
                                                >
                                                    {item.title}
                                                    <span>{openMenu === item.title ? "▲" : "▼"}</span>
                                                </button>

                                                <AnimatePresence>
                                                    {openMenu === item.title && (
                                                        <motion.ul
                                                            key={item.title}
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                                            className="ml-4 mt-2 space-y-2 overflow-hidden"
                                                        >
                                                            {item.children.map((child) => (
                                                                <li key={child.title}>
                                                                    <Link
                                                                        href={child.href || "#"}
                                                                        onClick={() => setMobileOpen(false)}
                                                                        className="block text-gray-700 hover:underline"
                                                                    >
                                                                        {child.title}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </motion.ul>
                                                    )}
                                                </AnimatePresence>
                                            </>
                                        ) : (
                                            <Link
                                                href={item.href || "#"}
                                                onClick={() => setMobileOpen(false)}
                                                className="block text-lg font-medium hover:text-blue-600"
                                            >
                                                {item.title}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
