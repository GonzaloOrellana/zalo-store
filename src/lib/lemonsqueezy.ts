import { CartItem } from "@/context/CartContext";

/**
 * Abre el checkout de Lemon Squeezy con un producto individual
 * @param checkoutUrl - URL del checkout del producto desde Lemon Squeezy
 */
export function openLemonSqueezyCheckout(checkoutUrl: string): void {
    if (!checkoutUrl || checkoutUrl.includes("PRODUCT-ID-AQUI")) {
        console.error("🔗 Checkout URL no configurado. Por favor añade las URLs de Lemon Squeezy en src/data/products.ts");
        alert("Este producto aún no está configurado para ventas. Por favor contacta al administrador.");
        return;
    }

    // Abrir el checkout en una nueva ventana/pestaña
    window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Genera una URL de checkout para múltiples productos (carrito)
 * Nota: Lemon Squeezy no soporta múltiples productos en un solo checkout nativamente.
 * Esta función abre el checkout del primer producto como fallback.
 * 
 * Para implementación completa con múltiples productos, considerarías usar:
 * 1. API de Lemon Squeezy para crear checkouts personalizados (requiere backend)
 * 2. Crear un "bundle" product en Lemon Squeezy que incluya todos los items
 * 3. Abrir checkouts secuencialmente (no ideal para UX)
 * 
 * @param items - Items del carrito
 * @returns URL del checkout o null si no hay items válidos
 */
export function getCartCheckoutUrl(items: CartItem[]): string | null {
    if (!items || items.length === 0) {
        return null;
    }

    // Si solo hay un producto, usar su checkout URL
    if (items.length === 1) {
        return items[0].checkoutUrl || null;
    }

    // Para múltiples productos: estrategia simplificada
    // Opción 1: Abrir el primer producto (implementación actual)
    // Opción 2: Crear un producto "bundle" en Lemon Squeezy manualmente

    console.warn("⚠️ Carrito con múltiples productos. Se abrirá el checkout del primer producto.");
    console.info("💡 Tip: Para vender múltiples productos juntos, crea un 'bundle' en Lemon Squeezy.");

    return items[0].checkoutUrl || null;
}

/**
 * Procesa el checkout del carrito
 * @param items - Items del carrito
 * @param onSuccess - Callback opcional después de abrir el checkout
 */
export function processCartCheckout(
    items: CartItem[],
    onSuccess?: () => void
): void {
    if (!items || items.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    // Validar que todos los productos tengan checkout URLs configuradas
    const unconfiguredProducts = items.filter(
        item => !item.checkoutUrl || item.checkoutUrl.includes("PRODUCT-ID-AQUI")
    );

    if (unconfiguredProducts.length > 0) {
        console.error("🔗 Productos sin configurar:", unconfiguredProducts.map(p => p.name));
        alert(`Algunos productos aún no están configurados para venta:\n${unconfiguredProducts.map(p => `- ${p.name}`).join('\n')}\n\nPor favor contacta al administrador.`);
        return;
    }

    if (items.length === 1) {
        // Caso simple: un solo producto
        openLemonSqueezyCheckout(items[0].checkoutUrl!);
        onSuccess?.();
    } else {
        // Múltiples productos: mostrar mensaje informativo
        const productList = items.map(item => `- ${item.name} (x${item.quantity})`).join('\n');
        const confirmMsg = `Tienes ${items.length} productos en tu carrito:\n\n${productList}\n\n⚠️ Nota: Actualmente se abrirá el checkout del primer producto.\n\n💡 Tip: Para facilitar la compra de múltiples productos, considera crear un "bundle" en Lemon Squeezy.\n\n¿Continuar con el checkout?`;

        if (confirm(confirmMsg)) {
            const checkoutUrl = getCartCheckoutUrl(items);
            if (checkoutUrl) {
                openLemonSqueezyCheckout(checkoutUrl);
                onSuccess?.();
            }
        }
    }
}
