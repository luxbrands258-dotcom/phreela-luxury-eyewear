import { createFileRoute } from "@tanstack/react-router";
import heroImage from "@/assets/solis-hero.jpg";
import { StoreShell } from "@/components/store-shell";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/catalog";

export const Route = createFileRoute("/colecao-signature")({ head: () => ({ meta: [
  { title: "Coleção Signature — SOLIS" }, { name: "description", content: "A coleção Signature da SOLIS: formas marcantes, acabamentos premium e proteção UV400." },
  { property: "og:title", content: "Coleção Signature — SOLIS" }, { property: "og:description", content: "Formas marcantes e acabamentos premium." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
] }), component: SignaturePage });

function SignaturePage() { return <StoreShell><main><section className="relative h-[58vh] min-h-[480px]"><img src={heroImage} alt="Coleção Signature SOLIS" width={1600} height={1000} className="h-full w-full object-cover"/><div className="absolute inset-0 bg-foreground/25"/><div className="absolute inset-x-0 bottom-0 p-7 text-background sm:p-14"><p className="text-xs font-semibold uppercase tracking-[0.2em]">Coleção 01</p><h1 className="mt-2 font-display text-6xl sm:text-8xl">Signature</h1><p className="mt-3 max-w-lg text-sm text-background/80">Silhuetas que transformam o olhar. Criadas para durar além da estação.</p></div></section><section className="mx-auto max-w-7xl px-4 py-16 sm:px-8"><div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-6 lg:grid-cols-3">{products.filter((_,i) => i !== 4).map((p) => <ProductCard key={p.slug} product={p}/>)}</div></section></main></StoreShell>; }