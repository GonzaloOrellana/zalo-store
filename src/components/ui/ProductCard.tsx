"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { Product as ProductType } from "@/data/products";

export default function ProductCard({ product }: { product: ProductType }) {
    const [isHovered, setIsHovered] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    return (
        <Link href={`/products/${product.slug}`} className="block">
            <motion.div
                className="group relative bg-black/90 backdrop-blur-xl rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-primary/50 transition-colors duration-300 shadow-2xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {/* Image Container */}
                <div className="relative aspect-[4/5] w-full bg-gray-900 overflow-hidden">
                    <Image
                        src={product.imageResult}
                        alt={`${product.name} Result`}
                        fill
                        className={`object-cover transition-opacity duration-500 ease-in-out ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <Image
                        src={product.imageRaw}
                        alt={`${product.name} Raw`}
                        fill
                        className={`object-cover absolute inset-0 transition-opacity duration-500 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                    {/* Hover Badge */}
                    <div className={`absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        Antes
                    </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-5">
                    <div className="flex justify-between items-end">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
                            <p className="text-white font-medium text-lg">{product.price === 0 ? "Gratis" : `$${product.price.toFixed(2)}`}</p>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            aria-label={`Add ${product.name} to cart`}
                            className="bg-white/10 hover:bg-primary hover:text-black text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(230,36,41,0.6)]"
                        >
                            <ShoppingCart size={20} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
