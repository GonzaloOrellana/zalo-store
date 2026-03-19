"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Carlos R.",
        role: "Content Creator",
        content: "Los presets de Zalo cambiaron totalmente mi flujo de trabajo. ¡Mis videos se ven increíbles ahora!",
        rating: 5
    },
    {
        id: 2,
        name: "Sofia M.",
        role: "TikToker",
        content: "Súper fáciles de usar. Literalmente arrastrar y soltar y el video parece de cine. 100% recomendados.",
        rating: 5
    },
    {
        id: 3,
        name: "Javier L.",
        role: "Filmmaker",
        content: "La calidad es impresionante. Los mejores por lejos.",
        rating: 5
    }
];

export default function Testimonials() {
    return (
        <section className="py-20 relative z-10 overflow-hidden">
            {/* Background blob */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="liquid-blob liquid-blob-secondary blob-animate-2 w-[400px] h-[400px] top-[10%] right-[5%] opacity-30" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 glass-text-glow">Lo que dicen los creadores</h2>
                    <div className="glass-divider w-20 mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-refraction rounded-2xl p-8 backdrop-blur-xl"
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-primary text-primary drop-shadow-[0_0_4px_rgba(230,36,41,0.5)]" />
                                ))}
                            </div>
                            <p className="text-gray-300 mb-6 leading-relaxed">&quot;{testimonial.content}&quot;</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(230,36,41,0.3)]">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                                    <p className="text-gray-500 text-xs">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
