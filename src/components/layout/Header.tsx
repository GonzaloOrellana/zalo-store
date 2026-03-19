"use client";
import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import { useState, useEffect } from "react";

import { useCart } from "@/context/CartContext";

import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { toggleCart, totalItems } = useCart();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
        <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500 pointer-events-none py-4 md:py-6">
            <div className="container mx-auto px-4 flex justify-between items-center pointer-events-auto">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tighter text-white group drop-shadow-md">
                    ZALO<span className="text-primary group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_8px_rgba(230,36,41,0.5)]">EDITS</span>
                </Link>

                {/* Pill Nav */}
                <nav className={`flex items-center px-6 py-3 rounded-full transition-all duration-500 font-display
                    bg-white/[0.03] backdrop-blur-2xl border border-white/[0.1] shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                    ${isScrolled ? 'bg-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)] border-white/[0.15]' : ''}
                `}>
                    <div className="hidden md:flex items-center space-x-6 mr-6">
                        <Link href="/#shop" className="text-sm font-bold text-gray-300 hover:text-white transition-all duration-300 tracking-wide hover:drop-shadow-[0_0_8px_rgba(230,36,41,0.4)]">SHOP</Link>
                        <Link href="/#contact" className="text-sm font-bold text-gray-300 hover:text-white transition-all duration-300 tracking-wide hover:drop-shadow-[0_0_8px_rgba(230,36,41,0.4)]">CONTACTO</Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleCart}
                            aria-label="Shopping cart"
                            className="relative text-white hover:text-primary transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(230,36,41,0.5)]"
                        >
                            <ShoppingCart size={22} />
                            {totalItems > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-primary text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(230,36,41,0.5)]">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <button
                            aria-label="Open menu"
                            className="md:hidden text-white hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={22} />
                        </button>
                    </div>
                </nav>
            </div>
        </header>

            {/* Mobile Menu Portal */}
            {mounted && createPortal(
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-3xl md:hidden flex flex-col items-center justify-center space-y-8"
                        >
                            {/* Background blobs in menu */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="liquid-blob liquid-blob-primary blob-animate-1 w-[300px] h-[300px] top-[20%] left-[10%]" />
                                <div className="liquid-blob liquid-blob-secondary blob-animate-2 w-[250px] h-[250px] bottom-[20%] right-[10%]" />
                            </div>

                            <button
                                className="absolute top-6 right-4 text-white hover:text-primary transition-colors p-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                                aria-label="Close menu"
                            >
                                <Menu size={24} className="rotate-45" />
                            </button>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Link
                                    href="/#shop"
                                    className="text-3xl font-bold text-white hover:text-primary transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(230,36,41,0.5)]"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    SHOP
                                </Link>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Link
                                    href="/#contact"
                                    className="text-3xl font-bold text-white hover:text-primary transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(230,36,41,0.5)]"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    CONTACTO
                                </Link>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}
