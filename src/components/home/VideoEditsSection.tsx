"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// Video data from public/Videos folder
const videoEdits = [
    {
        id: 1,
        title: "Video Edit 1",
        videoPath: "/Videos/Carrusel 1.mp4",
    },
    {
        id: 2,
        title: "Video Edit 2",
        videoPath: "/Videos/Carrusel 2.mp4",
    },
    {
        id: 3,
        title: "Video Edit 3",
        videoPath: "/Videos/Carrusel 3.mp4",
    },
    {
        id: 4,
        title: "Video Edit 4",
        videoPath: "/Videos/Carrusel 4.mp4",
    },
    {
        id: 5,
        title: "Video Edit 5",
        videoPath: "/Videos/Carrusel 5.mp4",
    },
];

export default function VideoEditsSection() {
    const [currentIndex, setCurrentIndex] = useState(2); // Start at center
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    const [showControls, setShowControls] = useState(true);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? videoEdits.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === videoEdits.length - 1 ? 0 : prev + 1));
    };

    const handleInteraction = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        controlsTimeoutRef.current = setTimeout(() => {
            setShowControls(false);
        }, 2000);
    };

    const togglePlayPause = () => {
        const currentVideo = videoRefs.current[currentIndex];
        if (currentVideo) {
            if (isPlaying) {
                currentVideo.pause();
            } else {
                currentVideo.play().catch(error => console.warn("Video play failed:", error));
            }
            setIsPlaying(!isPlaying);
            handleInteraction();
        }
    };

    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (video) {
                if (index === currentIndex && isPlaying) {
                    video.play().catch(error => console.warn("Video auto-play prevented:", error));
                    handleInteraction();
                } else {
                    video.pause();
                }
            }
        });
    }, [currentIndex, isPlaying]);

    const getCardStyle = (index: number) => {
        const diff = index - currentIndex;

        // Center card
        if (diff === 0) {
            return {
                scale: 1,
                rotateY: 0,
                opacity: 1,
                zIndex: 30,
                x: 0,
            };
        }

        // Left cards
        if (diff === -1) {
            return {
                scale: 0.75,
                rotateY: 25,
                opacity: 0.6,
                zIndex: 20,
                x: -100,
            };
        }

        // Right cards
        if (diff === 1) {
            return {
                scale: 0.75,
                rotateY: -25,
                opacity: 0.6,
                zIndex: 20,
                x: 100,
            };
        }

        // Far left
        if (diff === -2) {
            return {
                scale: 0.6,
                rotateY: 35,
                opacity: 0.3,
                zIndex: 10,
                x: -180,
            };
        }

        // Far right
        if (diff === 2) {
            return {
                scale: 0.6,
                rotateY: -35,
                opacity: 0.3,
                zIndex: 10,
                x: 180,
            };
        }

        // Hidden cards
        return {
            scale: 0.5,
            rotateY: diff > 0 ? -45 : 45,
            opacity: 0,
            zIndex: 0,
            x: diff > 0 ? 250 : -250,
        };
    };

    return (
        <section className="relative py-20 md:py-32 overflow-hidden">
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Liquid blobs behind carousel */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="liquid-blob liquid-blob-primary blob-animate-2 w-[500px] h-[500px] top-[5%] right-[10%] opacity-25" />
                <div className="liquid-blob liquid-blob-secondary blob-animate-1 w-[400px] h-[400px] bottom-[10%] left-[5%] opacity-20" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Copywriting */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight glass-text-glow">
                                Crea contenido que{" "}
                                <span className="text-primary drop-shadow-[0_0_15px_rgba(230,36,41,0.4)]">detenga el scroll.</span>
                            </h2>
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                                Ediciones dinámicas, transiciones fluidas y efectos que retienen la
                                atención de tu audiencia desde el primer segundo.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column - 3D Carousel */}
                    <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
                        {/* Perspective container */}
                        <div className="relative w-full h-full" style={{ perspective: "1200px" }}>
                            <AnimatePresence mode="sync">
                                {videoEdits.map((video, index) => {
                                    const style = getCardStyle(index);
                                    return (
                                        <div
                                            key={video.id}
                                            className="absolute left-1/2 top-1/2"
                                            style={{ transform: "translate(-50%, -50%)", zIndex: style.zIndex }}
                                        >
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{
                                                    scale: style.scale,
                                                    rotateY: style.rotateY,
                                                    opacity: style.opacity,
                                                    x: style.x,
                                                }}
                                            transition={{
                                                duration: 0.6,
                                                ease: [0.32, 0.72, 0, 1],
                                            }}
                                            style={{
                                                transformStyle: "preserve-3d",
                                            }}
                                        >
                                            {/* Video Card - Pill Shape with glass border */}
                                            <div
                                                className="w-[200px] h-[355px] md:w-[240px] md:h-[426px] rounded-[60px] overflow-hidden relative bg-black"
                                                style={{
                                                    boxShadow: index === currentIndex
                                                        ? '0 0 40px rgba(230,36,41,0.15), 0 20px 60px rgba(0,0,0,0.5)'
                                                        : '0 10px 40px rgba(0,0,0,0.5)',
                                                    border: index === currentIndex
                                                        ? '1px solid rgba(255,255,255,0.12)'
                                                        : '1px solid rgba(255,255,255,0.05)'
                                                }}
                                                onMouseEnter={handleInteraction}
                                                onMouseMove={handleInteraction}
                                                onClick={handleInteraction}
                                            >
                                                {/* Video element */}
                                                <video
                                                    ref={(el) => { videoRefs.current[index] = el; }}
                                                    src={video.videoPath}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                    loop
                                                    autoPlay
                                                    playsInline
                                                    muted
                                                />

                                                {/* Overlay effect */}
                                                <div className="absolute inset-0 bg-black/20" />

                                                {/* Play/Pause button */}
                                                <AnimatePresence>
                                                    {index === currentIndex && showControls && (
                                                        <motion.button
                                                            initial={{ opacity: 0, scale: 0.4 }}
                                                            animate={{ opacity: 0.8, scale: 0.8 }}
                                                            exit={{ opacity: 0, scale: 0.4 }}
                                                            transition={{ duration: 0.2 }}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                togglePlayPause();
                                                            }}
                                                            className="absolute inset-0 flex items-center justify-center group cursor-pointer z-10"
                                                            aria-label={isPlaying ? "Pause video" : "Play video"}
                                                        >
                                                            <div className="w-16 h-16 rounded-full glass-button flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                                                                {isPlaying ? (
                                                                    <Pause className="w-8 h-8 text-white" />
                                                                ) : (
                                                                    <Play className="w-8 h-8 text-white ml-1" />
                                                                )}
                                                            </div>
                                                        </motion.button>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                            </motion.div>
                                        </div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>

                        {/* Centralized Controls for Mobile-Friendly Interaction */}
                        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-50">
                            {/* Previous Button */}
                            <button
                                onClick={handlePrevious}
                                className="glass-button p-2.5 md:p-3 rounded-full hover:scale-105 transition-transform"
                                aria-label="Previous video"
                            >
                                <ChevronLeft className="w-5 h-5 text-white" />
                            </button>

                            {/* Dots indicator - Glass pills */}
                            <div className="flex gap-2">
                                {videoEdits.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                            ? "bg-primary w-8 shadow-[0_0_10px_rgba(230,36,41,0.5)]"
                                            : "bg-white/20 w-2 hover:bg-white/40"
                                            }`}
                                        aria-label={`Go to video ${index + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={handleNext}
                                className="glass-button p-2.5 md:p-3 rounded-full hover:scale-105 transition-transform"
                                aria-label="Next video"
                            >
                                <ChevronRight className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
