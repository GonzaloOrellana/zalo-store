"use client";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex items-center justify-top overflow-hidden">
            {/* Background Video */}
            <div className="fixed inset-0 z-0">
                <video
                    src="https://cdn.pixabay.com/video/2023/04/15/159063-818020287_large.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-40 scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            {/* Liquid Blobs */}
            <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
                <div className="liquid-blob liquid-blob-primary blob-animate-1 w-[500px] h-[500px] top-[10%] left-[5%]" />
                <div className="liquid-blob liquid-blob-secondary blob-animate-2 w-[400px] h-[400px] top-[30%] right-[5%]" />
                <div className="liquid-blob liquid-blob-mixed blob-animate-3 w-[350px] h-[350px] bottom-[15%] left-[40%]" />
            </div>

            {/* Noise overlay */}
            <div className="absolute inset-0 z-[2] noise-overlay pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 inline-block px-5 py-1.5 rounded-full glass-panel shimmer-border text-xs font-medium text-primary tracking-widest uppercase"
                >
                    Professional Color Correction
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 glass-text-glow"
                >
                    TRANSFORMA TUS <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">EDITS EN SEGUNDOS</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Presets de corrección de color profesional para After Effects.
                    Eleva tu contenido al nivel de los mejores creadores con un solo clic.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                >
                    <a
                        href="#shop"
                        className="inline-block glass-button glass-button-primary text-white font-display font-bold py-4 px-10 rounded-full hover:scale-105 transition-all duration-300"
                    >
                        EXPLORAR PRESETS
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
