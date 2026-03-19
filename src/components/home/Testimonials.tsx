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
        <section className="py-20 relative z-10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>Lo que dicen los creadores</h2>
                    <div className="w-20 h-1 bg-primary rounded-full mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-black/90 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-colors shadow-2xl"
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-primary text-primary" />
                                ))}
                            </div>
                            <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
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
