import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative z-10 overflow-hidden">
            {/* Glass divider top */}
            <div className="glass-divider" />

            <div className="relative bg-white/[0.02] backdrop-blur-2xl py-12">
                {/* Subtle blob in footer */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="liquid-blob liquid-blob-primary blob-animate-3 w-[300px] h-[300px] -bottom-[100px] left-[20%] opacity-20" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold text-white mb-2">ZALO<span className="text-primary drop-shadow-[0_0_8px_rgba(230,36,41,0.4)]">EDITS</span></h3>
                            <p className="text-gray-500 text-sm">Elevando la edición de video al siguiente nivel.</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link href="https://www.instagram.com/zalo.editz/" target="_blank" rel="noopener noreferrer" className="glass-button w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all">
                                <Instagram size={20} />
                            </Link>
                            <Link href="https://www.tiktok.com/@zaloedits" target="_blank" rel="noopener noreferrer" className="glass-button w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </Link>
                            <Link href="https://www.youtube.com/@ZaloEdits" target="_blank" rel="noopener noreferrer" className="glass-button w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all">
                                <Youtube size={20} />
                            </Link>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="flex flex-col items-center md:items-start gap-2">
                            <p>&copy; {new Date().getFullYear()} ZaloEdits. Todos los derechos reservados.</p>
                            <p>Diseñado y desarrollado por <Link href="https://www.gonzaorellana.com.ar/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">Gonzalo Orellana</Link></p>
                        </div>
                        <div className="flex gap-6">
                            <Link href="#" className="hover:text-gray-400 transition-colors">Términos</Link>
                            <Link href="#" className="hover:text-gray-400 transition-colors">Privacidad</Link>
                            <Link href="#" className="hover:text-gray-400 transition-colors">Contacto</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
