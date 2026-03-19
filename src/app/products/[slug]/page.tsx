import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/data/products";
import ProductDetail from "@/components/product/ProductDetail";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Generate static params for all products at build time
export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

// Generate metadata for each product page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        return {
            title: "Product Not Found",
        };
    }

    return {
        title: `${product.name} - ZaloStore`,
        description: product.description || `${product.name} color correction preset for After Effects`,
    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
            <Header />
            <ProductDetail product={product} />

        </main>
    );
}
