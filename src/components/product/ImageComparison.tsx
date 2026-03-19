"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ImageComparisonProps {
    imageRaw: string;
    imageResult: string;
    productName: string;
}

export default function ImageComparison({ imageRaw, imageResult, productName }: ImageComparisonProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = (x / rect.width) * 100;

        setSliderPosition(Math.max(0, Math.min(100, percentage)));
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        handleMove(e.clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length > 0) {
            handleMove(e.touches[0].clientX);
        }
    };

    useEffect(() => {
        const handleGlobalMouseUp = () => setIsDragging(false);
        window.addEventListener("mouseup", handleGlobalMouseUp);
        return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden rounded-2xl glass-refraction cursor-ew-resize select-none inline-block"
            style={{
                boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 20px rgba(230,36,41,0.08)'
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
        >
            {/* Before Image (Raw) - Full Background */}
            <div className="relative">
                <Image
                    src={imageRaw}
                    alt={`${productName} - Before`}
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />

            </div>

            {/* After Image (Result) - Clipped */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <Image
                    src={imageResult}
                    alt={`${productName} - After`}
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />

            </div>

            {/* Slider Handle - Glass style */}
            <div
                className="absolute top-0 bottom-0 w-0.5 cursor-ew-resize z-20"
                style={{
                    left: `${sliderPosition}%`,
                    transform: "translateX(-50%)",
                    background: 'rgba(255,255,255,0.6)',
                    boxShadow: '0 0 10px rgba(255,255,255,0.3)'
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
            >
                {/* Handle Circle - Glass */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center cursor-ew-resize"
                    style={{
                        background: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '2px solid rgba(255,255,255,0.3)',
                        boxShadow: '0 0 20px rgba(255,255,255,0.2), 0 0 40px rgba(230,36,41,0.1)'
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="flex gap-1">
                        <div className="w-0.5 h-6 bg-white/80 rounded-full"></div>
                        <div className="w-0.5 h-6 bg-white/80 rounded-full"></div>
                    </div>
                </motion.div>
            </div>

            {/* Instruction Hint - Glass pill */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isDragging ? 0 : 0.7 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-panel px-4 py-2 rounded-full text-xs text-white pointer-events-none"
            >
                Drag to compare
            </motion.div>
        </div>
    );
}
