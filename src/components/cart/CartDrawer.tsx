"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { processCartCheckout } from "@/lib/lemonsqueezy";

export default function CartDrawer() {
    const { items, isCartOpen, toggleCart, removeFromCart, updateQuantity, subtotal } = useCart();

    const handleCheckout = () => {
        processCartCheckout(items, () => {
            console.log("Checkout abierto exitosamente");
        });
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/50 backdrop-blur-md z-50"
                    />

                    {/* Drawer - Glass panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md z-50 flex flex-col"
                        style={{
                            background: 'rgba(10, 10, 10, 0.85)',
                            backdropFilter: 'blur(40px)',
                            WebkitBackdropFilter: 'blur(40px)',
                            borderLeft: '1px solid rgba(255,255,255,0.06)',
                            boxShadow: '-20px 0 60px rgba(0,0,0,0.5)'
                        }}
                    >
                        {/* Header */}
                        <div className="p-6 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <ShoppingBag className="text-primary drop-shadow-[0_0_8px_rgba(230,36,41,0.5)]" />
                                Tu Carrito
                            </h2>
                            <button
                                onClick={toggleCart}
                                className="p-2 glass-button rounded-full transition-colors"
                            >
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-20 h-20 rounded-full glass-panel flex items-center justify-center">
                                        <ShoppingBag size={40} className="text-gray-600" />
                                    </div>
                                    <p className="text-gray-400 text-lg">Tu carrito está vacío</p>
                                    <button
                                        onClick={toggleCart}
                                        className="text-primary hover:underline font-medium hover:drop-shadow-[0_0_8px_rgba(230,36,41,0.4)] transition-all"
                                    >
                                        Explorar productos
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="flex gap-4 glass-refraction rounded-xl p-4"
                                    >
                                        {/* Image */}
                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-black">
                                            <Image
                                                src={item.imageResult}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-bold text-white">{item.name}</h3>
                                                <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-3 glass-panel rounded-lg p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:text-white text-gray-400 transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:text-white text-gray-400 transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    title="Remove item"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 space-y-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.3)' }}>
                                <div className="flex items-center justify-between text-lg font-bold">
                                    <span className="text-gray-400">Subtotal</span>
                                    <span className="text-white">${subtotal.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full glass-button glass-button-primary text-white font-bold py-4 rounded-xl transition-all"
                                >
                                    Comprar
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
