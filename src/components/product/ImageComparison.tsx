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
            className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-gray-900 cursor-ew-resize select-none inline-block"
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

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white/80 cursor-ew-resize z-20"
                style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
            >
                {/* Handle Circle */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center justify-center cursor-ew-resize border-4 border-background"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="flex gap-1">
                        <div className="w-0.5 h-6 bg-background rounded-full"></div>
                        <div className="w-0.5 h-6 bg-background rounded-full"></div>
                    </div>
                </motion.div>
            </div>

            {/* Instruction Hint */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isDragging ? 0 : 0.7 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-xs text-white pointer-events-none"
            >
                Drag to compare
            </motion.div>
        </div>
    );
}
