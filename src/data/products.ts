export interface Product {
    id: string;
    name: string;
    price: number;
    imageResult: string;
    imageRaw: string;
    slug: string;
    description?: string;
    features?: string[];
    checkoutUrl?: string; // 🔗 URL del checkout de Lemon Squeezy - REEMPLAZAR con tu URL
}

export const products: Product[] = [
    {
        id: "1",
        name: "CC Orange",
        price: 10.00,
        imageResult: "/imagenes/ccs/cc-orange/cc-orange.jpg",
        imageRaw: "/imagenes/ccs/cc-orange/sin-orange.jpg",
        slug: "cc-orange",
        description: "CC Preset perfecto para contenido energético y dinámico.",
        features: [
            "Acceso de por vida",
            "Descarga instantánea",
            "Compatible con todas las versiones de After Effects"
        ],
        // 🔗 TODO: Reemplaza esta URL con la de tu producto en Lemon Squeezy
        checkoutUrl: "https://zalostore.lemonsqueezy.com/buy/bb28fddc-9eea-40c4-95d1-07b47aa53ded"
    },
    {
        id: "2",
        name: "CC Crimson",
        price: 10.00,
        imageResult: "/imagenes/ccs/cc-crimson/cc-crimson.jpg",
        imageRaw: "/imagenes/ccs/cc-crimson/sin-crimson.jpg",
        slug: "cc-crimson",
        description: "Preset cinematográfico con tonos rojos intensos. Dale a tu contenido un look profesional al estilo de grandes producciones.",
        features: [
            "Acceso de por vida",
            "Descarga instantánea",
            "Compatible con todas las versiones de After Effects"
        ],
        // 🔗 TODO: Reemplaza esta URL con la de tu producto en Lemon Squeezy
        checkoutUrl: "https://zalostore.lemonsqueezy.com/buy/74b32dc8-00c2-4931-897e-e1448c62643b"
    },
    {
        id: "3",
        name: "CC Glow",
        price: 5.00,
        imageResult: "/imagenes/ccs/cc-glow/cc-glow.jpg",
        imageRaw: "/imagenes/ccs/cc-glow/sin-glow.jpg",
        slug: "cc-glow",
        description: "Añade un brillo etéreo y mágico a tus videos. Ideal para contenido de estilo soñador y atmosférico.",
        features: [
            "Acceso de por vida",
            "Descarga instantánea",
            "Compatible con todas las versiones de After Effects"
        ],
        // 🔗 TODO: Reemplaza esta URL con la de tu producto en Lemon Squeezy
        checkoutUrl: "https://zalostore.lemonsqueezy.com/buy/87e7a259-d3a4-4b43-bcd7-10f30a13c21e"
    },
    {
        id: "4",
        name: "CC Dark",
        price: 5.00,
        imageResult: "/imagenes/ccs/cc-dark/cc-dark.jpg",
        imageRaw: "/imagenes/ccs/cc-dark/sin-dark.jpg",
        slug: "cc-dark",
        description: "Preset oscuro y moody para contenido dramático. Perfecto para crear atmósferas intensas y misteriosas.",
        features: [
            "Acceso de por vida",
            "Descarga instantánea",
            "Compatible con todas las versiones de After Effects"
        ],
        // 🔗 TODO: Reemplaza esta URL con la de tu producto en Lemon Squeezy
        checkoutUrl: "https://zalostore.lemonsqueezy.com/buy/5424a572-5533-4a71-9cea-4029f98d4ad3"
    },
    {
        id: "5",
        name: "CC Bright",
        price: 0.00,
        imageResult: "/imagenes/ccs/cc-bright/cc-bright.jpg",
        imageRaw: "/imagenes/ccs/cc-bright/sin-bright.jpg",
        slug: "cc-bright",
        description: "Preset luminoso y alegre con colores vibrantes. Perfecto para contenido optimista y lleno de energía.",
        features: [
            "Acceso de por vida",
            "Descarga instantánea",
            "Compatible con todas las versiones de After Effects"
        ],
        // 🔗 TODO: Reemplaza esta URL con la de tu producto en Lemon Squeezy
        checkoutUrl: "https://zalostore.lemonsqueezy.com/buy/18831766-7a41-4769-bdc8-bf103c27e8fc"
    },
    {
        id: "6",
        name: "CC Sapphire",
        price: 5.00,
        imageResult: "/imagenes/ccs/cc-sapphire/cc-sapphire.jpg",
        imageRaw: "/imagenes/ccs/cc-sapphire/sin-sapphire.jpg",
        slug: "cc-sapphire",
        description: "Preset con tonos azules profundos y elegantes. Dale a tu contenido un look sofisticado y profesional.",
        features: [
            "Acceso de por vida",
            "Descarga instantánea",
            "Compatible con todas las versiones de After Effects"
        ],
        // 🔗 TODO: Reemplaza esta URL con la de tu producto en Lemon Squeezy
        checkoutUrl: "https://zalostore.lemonsqueezy.com/buy/ba0df746-4f1f-49d7-a94d-85a9fda793d7"
    }
];

export function getProductBySlug(slug: string): Product | undefined {
    return products.find(product => product.slug === slug);
}
