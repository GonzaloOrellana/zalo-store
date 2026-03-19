import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black/90 backdrop-blur-xl py-12 relative z-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-white mb-2">ZALO<span className="text-primary">EDITS</span></h3>
                        <p className="text-gray-500 text-sm">Elevando la edición de video al siguiente nivel.</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="https://www.instagram.com/zalo.editz/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
                            <Instagram size={24} />
                        </Link>
                        <Link href="https://www.tiktok.com/@zaloedits" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                            </svg>
                        </Link>
                        <Link href="https://www.youtube.com/@ZaloEdits" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
                            <Youtube size={24} />
                        </Link>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <p>&copy; {new Date().getFullYear()} ZaloEdits. Todos los derechos reservados.</p>
                        <p>Diseñado y desarrollado por <Link href="https://gonzaorellana.com.ar/portfolio/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">Gonzalo Orellana</Link></p>
                    </div>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-gray-400 transition-colors">Términos</Link>
                        <Link href="#" className="hover:text-gray-400 transition-colors">Privacidad</Link>
                        <Link href="#" className="hover:text-gray-400 transition-colors">Contacto</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
