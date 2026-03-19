# 🍋 Guía de Configuración de Lemon Squeezy

Esta guía te ayudará a configurar Lemon Squeezy para vender tus presets de forma automática con pagos internacionales.

## 📋 Tabla de Contenidos

1. [Crear Cuenta en Lemon Squeezy](#1-crear-cuenta-en-lemon-squeezy)
2. [Configurar tu Store](#2-configurar-tu-store)
3. [Añadir Productos Digitales](#3-añadir-productos-digitales)
4. [Subir Archivos de Presets](#4-subir-archivos-de-presets)
5. [Obtener Checkout URLs](#5-obtener-checkout-urls)
6. [Configurar el Sitio Web](#6-configurar-el-sitio-web)
7. [Testing de Pagos](#7-testing-de-pagos)
8. [Producción](#8-producción)

---

## 1. Crear Cuenta en Lemon Squeezy

1. Ve a [lemonsqueezy.com](https://www.lemonsqueezy.com/)
2. Haz click en **"Get Started"** o **"Sign Up"**
3. Completa el registro con tu email
4. Verifica tu email

**Costo:** Gratis para empezar. Solo pagas 5% + fees de procesamiento por cada venta.

---

## 2. Configurar tu Store

1. Una vez logueado, ve a **"Stores"** en el menú lateral
2. Haz click en **"Create Store"** (si es tu primera vez)
3. Completa la información:
   - **Store Name:** ZaloStore (o el nombre que prefieras)
   - **Store URL:** tu-nombre.lemonsqueezy.com
   - **Currency:** USD (recomendado para ventas internacionales)
   - **Country:** Tu país

4. Configura la información fiscal y de pago:
   - Ve a **Settings → Store Settings**
   - Completa **Tax Settings** (Lemon Squeezy puede manejar impuestos automáticamente)
   - Configura **Payment Methods** (conecta tu cuenta bancaria o PayPal)

---

## 3. Añadir Productos Digitales

Para cada uno de tus 6 presets:

### Paso a Paso:

1. En el dashboard, ve a **"Products"**
2. Haz click en **"Create Product"**
3. Completa la información del producto:

**Para CC Orange (ejemplo):**
- **Product Name:** CC Orange
- **Description:** CC Preset perfecto para contenido energético y dinámico.
- **Price:** $10.00 USD
- **Product Type:** Digital Product
- **Category:** Digital Downloads

4. En la sección **"Files"**:
   - Haz click en **"Add File"**
   - Sube tu archivo de preset (.aep, .zip, o el formato que uses)
   - Lemon Squeezy lo guardará y lo entregará automáticamente después del pago

5. **Settings del producto:**
   - ✅ **Enable Purchase** (activar ventas)
   - ✅ **Automatic Email Delivery** (entrega automática por email)
   - **Receipt Email:** Personaliza el email que recibirán los clientes

6. Haz click en **"Save Product"**

### Repite para todos los productos:

- ✅ CC Orange - $10.00
- ✅ CC Crimson - $10.00
- ✅ CC Glow - $5.00
- ✅ CC Dark - $5.00
- ✅ CC Bright - $5.00
- ✅ CC Sapphire - $5.00

---

## 4. Subir Archivos de Presets

### Formatos Recomendados:

1. **Archivo Individual:** Sube el preset (.aep, .lrtemplate, etc.)
2. **ZIP con Todo:** Crea un .zip con:
   - El archivo del preset
   - README.txt con instrucciones de instalación
   - Video tutorial (opcional)
   - Proyecto de ejemplo (opcional)

### Tamaño Máximo:
Lemon Squeezy soporta archivos hasta **2GB** por producto.

---

## 5. Obtener Checkout URLs

Para cada producto que creaste:

1. Ve a **"Products"** en el dashboard
2. Haz click en el producto (ej: CC Orange)
3. Busca la sección **"Checkout"** o **"Share"**
4. Copia la **Checkout URL** - se verá algo así:
   ```
   https://tu-tienda.lemonsqueezy.com/checkout/buy/abc123def456
   ```

5. **Guarda esta URL** - la necesitarás en el siguiente paso

### URLs que necesitas copiar:

- [ ] CC Orange URL
- [ ] CC Crimson URL
- [ ] CC Glow URL
- [ ] CC Dark URL
- [ ] CC Bright URL
- [ ] CC Sapphire URL

---

## 6. Configurar el Sitio Web

### 🔗 Paso 1: Abrir el archivo de productos

1. Abre el archivo: `src/data/products.ts`
2. Busca cada producto

### 🔗 Paso 2: Reemplazar las URLs

Para **cada producto**, encontrarás esta línea:

```typescript
// 🔗 TODO: Reemplaza esta URL con la de tu producto en Lemon Squeezy
checkoutUrl: "https://tu-tienda.lemonsqueezy.com/checkout/buy/PRODUCT-ID-AQUI"
```

**Reemplázala** con la URL real que copiaste de Lemon Squeezy:

```typescript
// ✅ Ejemplo configurado:
checkoutUrl: "https://zalostore.lemonsqueezy.com/checkout/buy/abc123def456"
```

### Ejemplo completo:

```typescript
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
    // ✅ URL configurada correctamente:
    checkoutUrl: "https://zalostore.lemonsqueezy.com/checkout/buy/abc123def456"
},
```

### 🔗 Paso 3: Verificar

1. Guarda el archivo `products.ts`
2. El servidor de Next.js debería recargar automáticamente
3. Revisa la consola del navegador para asegurarte de que no hay errores

---

## 7. Testing de Pagos

### Activar Modo Test:

1. En Lemon Squeezy, ve a **Settings → Test Mode**
2. Activa **"Enable Test Mode"**
3. Todos los pagos serán simulados (no se cobrará dinero real)

### Probar el Checkout:

1. Ve a tu sitio web: `http://localhost:3000`
2. Añade un producto al carrito
3. Haz click en **"Comprar"**
4. Se abrirá el checkout de Lemon Squeezy

### Tarjetas de Prueba:

Usa estas tarjetas para simular pagos:

**Tarjeta Aprobada:**
- Número: `4242 4242 4242 4242`
- Fecha: Cualquier fecha futura
- CVC: Cualquier 3 dígitos

**Tarjeta Rechazada:**
- Número: `4000 0000 0000 0002`

### Verificar Email:

1. Completa el pago de prueba
2. Revisa tu email
3. Deberías recibir:
   - Email de confirmación
   - Link de descarga del preset

---

## 8. Producción

### Cuando Estés Listo para Vender:

1. **Desactiva Test Mode:**
   - Ve a **Settings → Test Mode**
   - Desactiva **"Enable Test Mode"**

2. **Verifica Información Fiscal:**
   - Ve a **Settings → Tax Settings**
   - Asegúrate de que todo esté configurado correctamente
   - Lemon Squeezy maneja VAT europeo y sales tax automáticamente

3. **Conecta tu Método de Pago:**
   - Ve a **Settings → Payouts**
   - Conecta tu cuenta bancaria o PayPal
   - Configura la frecuencia de pagos (semanal, mensual, etc.)

4. **Deploy a Vercel:**
   - Haz push de tu código a GitHub
   - Conecta el repo con Vercel
   - Deploy automático

5. **Primera Venta Real:**
   - Haz una compra de prueba con dinero real (puedes reembolsarte después)
   - Verifica que todo funcione correctamente
   - Confirma que recibes el email con el archivo

---

## 🎉 ¡Listo!

Tu tienda está configurada y lista para vender internacionalmente.

### Checklist Final:

- [ ] Cuenta de Lemon Squeezy creada
- [ ] Store configurada
- [ ] 6 productos añadidos con archivos subidos
- [ ] Checkout URLs copiadas
- [ ] URLs configuradas en `products.ts`
- [ ] Test mode probado exitosamente
- [ ] Información fiscal configurada
- [ ] Método de pago conectado
- [ ] Test mode desactivado
- [ ] Sitio deployado en Vercel

---

## 💡 Tips Adicionales

### Email Marketing:
Lemon Squeezy incluye herramientas para:
- Enviar emails a clientes anteriores
- Ofrecer descuentos
- Crear bundles (paquetes de productos)

### Analytics:
- Ve a **Analytics** para ver estadísticas de ventas
- Revisa qué productos venden más
- Analiza de dónde vienen tus clientes

### Descuentos:
1. Ve a **Discounts**
2. Crea códigos de descuento (ej: LANZAMIENTO10 para 10% off)
3. Comparte el código con tus clientes

### Bundles:
Si quieres vender todos los presets juntos con descuento:
1. Crea un nuevo producto "Bundle Completo CC Presets"
2. Sube todos los archivos juntos
3. Ponle un precio con descuento (ej: $35 en vez de $45)

---

## 🆘 Soporte

- **Documentación de Lemon Squeezy:** [docs.lemonsqueezy.com](https://docs.lemonsqueezy.com/)
- **Soporte:** support@lemonsqueezy.com
- **Discord de Lemon Squeezy:** [discord.gg/lemonsqueezy](https://discord.gg/lemonsqueezy)

---

**¡Éxito con tus ventas! 🚀**
