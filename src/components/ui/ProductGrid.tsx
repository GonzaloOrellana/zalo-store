"use client";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";

export default function ProductGrid() {
    return (
        <section id="shop" className="container mx-auto px-4 py-20 relative z-10">
            <div className="flex flex-col items-center mb-8">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 glass-text-glow" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>Presets</h2>
                <div className="glass-divider w-20" />
            </div>

            {/* Scroll indicator - solo visible en móvil */}
            <div className="lg:hidden text-center mb-4">
                <p className="text-sm text-white/60 flex items-center justify-center gap-2">
                    <span className="inline-block animate-bounce">↓</span>
                    Desliza para ver más
                    <span className="inline-block animate-bounce">↓</span>
                </p>
            </div>

            {/* Container con scroll interno en móvil, grid normal en desktop */}
            <div className="
                lg:grid lg:grid-cols-4 lg:gap-6
                max-lg:h-[70vh] max-lg:overflow-y-auto max-lg:overscroll-contain
                max-lg:pr-2 max-lg:space-y-6
                scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-white/5
                max-lg:snap-y max-lg:snap-mandatory
            ">
                {products.map((product) => (
                    <div key={product.id} className="max-lg:snap-start">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </section>
    );
}
