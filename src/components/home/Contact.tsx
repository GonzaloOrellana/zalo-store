"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Instagram, Send } from "lucide-react";
import Link from "next/link";

export default function Contact() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch("https://formspree.io/f/myzrjnvl", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    }

    return (
        <section id="contact" className="py-20 relative z-10 overflow-hidden">
            {/* Background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="liquid-blob liquid-blob-primary blob-animate-1 w-[350px] h-[350px] top-[20%] left-[5%] opacity-20" />
                <div className="liquid-blob liquid-blob-secondary blob-animate-3 w-[300px] h-[300px] bottom-[10%] right-[10%] opacity-20" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 glass-text-glow">¿Necesitas ayuda?</h2>
                        <p className="text-gray-400">Contáctame directamente o envíame un mensaje.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Direct Contact Options */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white mb-6">Mensaje Directo</h3>

                            <Link
                                href="https://www.instagram.com/zalo.editz/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-xl glass-refraction transition-all group"
                            >
                                <div className="w-12 h-12 rounded-full glass-button flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(230,36,41,0.4)] transition-all">
                                    <Instagram size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Instagram</h4>
                                    <p className="text-gray-400 text-sm">@zalo.editz</p>
                                </div>
                            </Link>

                            <Link
                                href="https://www.tiktok.com/@zaloedits"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-xl glass-refraction transition-all group"
                            >
                                <div className="w-12 h-12 rounded-full glass-button flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(230,36,41,0.4)] transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">TikTok</h4>
                                    <p className="text-gray-400 text-sm">@zaloedits</p>
                                </div>
                            </Link>

                        </div>

                        {/* Contact Form */}
                        <form onSubmit={handleSubmit} className="space-y-4 glass-refraction rounded-2xl p-8 backdrop-blur-xl">
                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 rounded-lg text-green-200 text-sm glass-panel"
                                    style={{ borderColor: 'rgba(74, 222, 128, 0.3)', background: 'rgba(74, 222, 128, 0.1)' }}
                                >
                                    ¡Mensaje enviado con éxito! Te responderé pronto a tu email.
                                </motion.div>
                            )}

                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 rounded-lg text-red-200 text-sm glass-panel"
                                    style={{ borderColor: 'rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.1)' }}
                                >
                                    Hubo un error al enviar el mensaje. Por favor intenta nuevamente o contáctame por Instagram.
                                </motion.div>
                            )}

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full glass-input rounded-lg px-4 py-3"
                                    placeholder="Tu nombre"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full glass-input rounded-lg px-4 py-3"
                                    placeholder="tu@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Mensaje</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full glass-input rounded-lg px-4 py-3 resize-none"
                                    placeholder="¿En qué puedo ayudarte?"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full glass-button glass-button-primary text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'submitting' ? (
                                    <span>Enviando...</span>
                                ) : (
                                    <>
                                        <span>Enviar Mensaje</span>
                                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
