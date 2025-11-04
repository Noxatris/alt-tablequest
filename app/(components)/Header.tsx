"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavHeader from "./NavHeader";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed w-full flex justify-around items-center p-4 z-50 transition-all duration-500 ease-in-out
                ${scrolled
                    ? "h-[8vh] bg-black/50 backdrop-blur-md shadow-lg"
                    : "h-[10vh] bg-transparent"
                }`}
        >
            <Link href="/" className="relative aspect-5/1 h-full transition-all duration-500 ease-in-out">
                <Image src="/logo.webp" alt="Logo tablequest" fill />
            </Link>
            <NavHeader />
        </header>
    );
}
