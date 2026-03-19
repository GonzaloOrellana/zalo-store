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
            <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold tracking-tighter text-white group">
                        ZALO<span className="text-primary group-hover:text-white transition-colors">EDITS</span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/#shop" className="text-sm font-medium text-gray-300 hover:text-white transition-colors tracking-wide">SHOP</Link>
                        <Link href="/#contact" className="text-sm font-medium text-gray-300 hover:text-white transition-colors tracking-wide">CONTACTO</Link>
                    </nav>

                    <div className="flex items-center space-x-6">
                        <button
                            onClick={toggleCart}
                            aria-label="Shopping cart"
                            className="relative text-white hover:text-primary transition-colors"
                        >
                            <ShoppingCart size={24} />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <button
                            aria-label="Open menu"
                            className="md:hidden text-white"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                    </div>
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
                            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center space-y-8"
                        >
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
                                    className="text-3xl font-bold text-white hover:text-primary transition-colors"
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
                                    className="text-3xl font-bold text-white hover:text-primary transition-colors"
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
