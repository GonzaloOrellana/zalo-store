"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Instagram, Send } from "lucide-react";
import Link from "next/link";

export default function Contact() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData(e.currentTarget);

        try {
            // NOTA PARA EL USUARIO: Debes registrarte en https://formspree.io/
            // Crear un nuevo formulario con tu email: proyectojazzylofi@gmail.com
            // Y reemplazar "TU_ID_DE_FORMSPREE" con el código que te den (ej: xmqzqbdp)
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
                setTimeout(() => setStatus('idle'), 5000); // Reset status after 5s
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    }

    return (
        <section id="contact" className="py-20 relative z-10 overflow-hidden">

            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>¿Necesitas ayuda?</h2>
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
                                className="flex items-center gap-4 p-4 rounded-xl bg-black/90 backdrop-blur-xl border border-white/10 hover:border-primary/50 transition-all group shadow-2xl"
                            >
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
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
                                className="flex items-center gap-4 p-4 rounded-xl bg-black/90 backdrop-blur-xl border border-white/10 hover:border-primary/50 transition-all group shadow-2xl"
                            >
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
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
                        <form onSubmit={handleSubmit} className="space-y-4 bg-black/90 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">
                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm"
                                >
                                    ¡Mensaje enviado con éxito! Te responderé pronto a tu email.
                                </motion.div>
                            )}

                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm"
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
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
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
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
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
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                                    placeholder="¿En qué puedo ayudarte?"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-primary transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
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
