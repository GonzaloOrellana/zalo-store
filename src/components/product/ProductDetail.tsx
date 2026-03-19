"use client";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowLeft, Check, AlertTriangle } from "lucide-react";
import Link from "next/link";
import ImageComparison from "./ImageComparison";
import { Product } from "@/data/products";

interface ProductDetailProps {
    product: Product;
}

import { useCart } from "@/context/CartContext";

export default function ProductDetail({ product }: ProductDetailProps) {
    const { addToCart } = useCart();

    return (
        <div className="min-h-screen bg-background pt-24 pb-16 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="liquid-blob liquid-blob-primary blob-animate-1 w-[400px] h-[400px] top-[5%] right-[10%] opacity-15" />
                <div className="liquid-blob liquid-blob-secondary blob-animate-3 w-[350px] h-[350px] bottom-[20%] left-[5%] opacity-15" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Breadcrumb Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-8"
                >
                    <Link
                        href="/#shop"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-all duration-300 glass-panel px-4 py-2 rounded-full hover:drop-shadow-[0_0_8px_rgba(230,36,41,0.3)]"
                    >
                        <ArrowLeft size={18} />
                        <span className="text-sm">Back to Shop</span>
                    </Link>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column - Image Comparison */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <ImageComparison
                            imageRaw={product.imageRaw}
                            imageResult={product.imageResult}
                            productName={product.name}
                        />
                    </motion.div>

                    {/* Right Column - Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:sticky lg:top-28"
                    >
                        {/* Product Name */}
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 glass-text-glow">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_20px_rgba(230,36,41,0.3)]">
                                {product.price === 0 ? "Gratis" : `$${product.price.toFixed(2)}`}
                            </span>
                            {product.price > 0 && <span className="text-gray-400 text-lg">USD</span>}
                        </div>

                        {/* Description */}
                        {product.description && (
                            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                {product.description}
                            </p>
                        )}

                        {/* Features & Requirements Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            {/* Features */}
                            {product.features && product.features.length > 0 && (
                                <div className="glass-refraction rounded-xl p-6">
                                    <h3 className="text-xl font-bold text-white mb-4">Ventajas</h3>
                                    <ul className="space-y-3">
                                        {product.features.map((feature, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                                className="flex items-start gap-3"
                                            >
                                                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 border border-primary flex items-center justify-center shadow-[0_0_8px_rgba(230,36,41,0.3)]">
                                                    <Check size={12} className="text-primary" />
                                                </div>
                                                <span className="text-gray-300 text-sm">{feature}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Required Plugins */}
                            <div className="glass-refraction rounded-xl p-6">
                                <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
                                    <AlertTriangle size={20} className="drop-shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
                                    Plugins necesarios
                                </h3>
                                <ul className="space-y-3">
                                    {["Bcc", "Sapphire", "Looks"].map((plugin, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                                            <span className="text-gray-300 font-medium">{plugin}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                                <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                                    * Estos plugins son necesarios para que el preset funcione correctamente.
                                </p>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <button
                                onClick={() => addToCart(product)}
                                className="w-full glass-button glass-button-primary text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3 text-lg"
                                aria-label={`Add ${product.name} to cart`}
                            >
                                <ShoppingCart size={24} />
                                <span>Add to Cart</span>
                            </button>
                        </motion.div>

                        {/* Info Cards */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="glass-refraction rounded-xl p-4 text-center"
                            >
                                <p className="text-gray-400 text-sm mb-1">Instant Download</p>
                                <p className="text-white font-bold">Digital Product</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                className="glass-refraction rounded-xl p-4 text-center"
                            >
                                <p className="text-gray-400 text-sm mb-1">Lifetime Updates</p>
                                <p className="text-white font-bold">Free Support</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
