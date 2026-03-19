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
                currentVideo.play();
            }
            setIsPlaying(!isPlaying);
            handleInteraction();
        }
    };

    // Control video playback when currentIndex changes
    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (video) {
                if (index === currentIndex && isPlaying) {
                    video.play();
                    handleInteraction();
                } else {
                    video.pause();
                }
            }
        });
    }, [currentIndex, isPlaying]);

    const getCardStyle = (index: number) => {
        const diff = index - currentIndex;
        const absX = Math.abs(diff);

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
        <section className="relative py-20 md:py-32 overflow-hidden bg-black">
            {/* Radial gradient background */}
            <div className="absolute inset-0 bg-gradient-radial from-gray-900/30 via-black to-black" />

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
                            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                Crea contenido que{" "}
                                <span className="text-primary">detenga el scroll.</span>
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
                                        <motion.div
                                            key={video.id}
                                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                            initial={{ opacity: 0 }}
                                            animate={{
                                                scale: style.scale,
                                                rotateY: style.rotateY,
                                                opacity: style.opacity,
                                                zIndex: style.zIndex,
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
                                            {/* Video Card - Pill Shape */}
                                            <div
                                                className="w-[200px] h-[355px] md:w-[240px] md:h-[426px] rounded-[60px] shadow-2xl overflow-hidden relative bg-black"
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
                                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
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
                                    );
                                })}
                            </AnimatePresence>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={handlePrevious}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full transition-all duration-300 hover:scale-110"
                            aria-label="Previous video"
                        >
                            <ChevronLeft className="w-6 h-6 text-white" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full transition-all duration-300 hover:scale-110"
                            aria-label="Next video"
                        >
                            <ChevronRight className="w-6 h-6 text-white" />
                        </button>

                        {/* Dots indicator */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-50">
                            {videoEdits.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? "bg-primary w-8"
                                        : "bg-white/30 hover:bg-white/50"
                                        }`}
                                    aria-label={`Go to video ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
