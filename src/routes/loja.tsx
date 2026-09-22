import { createFileRoute } from "@tanstack/react-router";
import { StoreShell } from "@/components/store-shell";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/catalog";

export const Route = createFileRoute("/loja")({
  validateSearch: (search: Record<string, unknown>) => ({ filtro: typeof search.filtro === "string" ? search.filtro : undefined }),
  head: () => ({ meta: [
    { title: "Loja — SOLIS Eyewear" }, { name: "description", content: "Explore todos os óculos de sol e armações premium SOLIS." },
    { property: "og:title", content: "Loja — SOLIS Eyewear" }, { property: "og:description", content: "Explore todos os óculos premium SOLIS." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: StorePage,
});

function StorePage() {
  return <StoreShell><main className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-20"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Coleção completa</p><h1 className="mt-3 font-display text-5xl sm:text-7xl">Encontre a sua luz.</h1><div className="mt-5 flex gap-5 overflow-x-auto border-b border-border pb-4 text-xs font-semibold"><span className="border-b border-foreground pb-4">Todos</span><span className="text-muted-foreground">Ovais</span><span className="text-muted-foreground">Cat-eye</span><span className="text-muted-foreground">Retangulares</span></div><div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-6 lg:grid-cols-3">{products.map((p) => <ProductCard key={p.slug} product={p}/>)}</div></main></StoreShell>;
}