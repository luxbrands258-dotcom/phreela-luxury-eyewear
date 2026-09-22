import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/solis-hero.jpg";
import { StoreShell } from "@/components/store-shell";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "SOLIS — Óculos premium em Moçambique" },
    { name: "description", content: "Descubra óculos premium sem a margem do luxo. Entrega grátis em Maputo e Matola, com pagamento ao receber." },
    { property: "og:title", content: "SOLIS — Óculos premium em Moçambique" },
    { property: "og:description", content: "Óculos premium sem a margem do luxo, com pagamento ao receber." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

function Index() {
  const [offerOpen, setOfferOpen] = useState(true);
  return (
    <StoreShell>
      <main>
        <section className="relative min-h-[calc(100svh-104px)] overflow-hidden">
          <img src={heroImage} alt="Mulher com óculos SOLIS em Maputo" width={1600} height={1000} className="absolute inset-0 h-full w-full object-cover object-[58%_center]" />
          <div className="absolute inset-0 bg-foreground/20" />
          <div className="relative z-10 flex min-h-[calc(100svh-104px)] items-end justify-center px-5 pb-12 sm:items-center sm:pb-0">
            <div className="max-w-2xl bg-background/94 px-6 py-8 text-center backdrop-blur-sm sm:px-14 sm:py-12">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Coleção Verão 2026</p>
              <h1 className="font-display text-4xl leading-[0.95] sm:text-6xl">Óculos de Sol Premium.<br/>Sem a margem do luxo.</h1>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg"><Link to="/colecao-signature">Ver Coleção Signature</Link></Button>
                <Button asChild size="lg" variant="outline"><Link to="/loja" search={{ filtro: "mais-vendidos" }}>Mais Vendidos</Link></Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-28">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">A essência SOLIS</p>
          <h2 className="mt-5 font-display text-3xl leading-tight sm:text-5xl">Design apurado. Conforto sem esforço.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">Cada armação é selecionada pela leveza, acabamento e equilíbrio no rosto. Lentes com proteção UV400, materiais duradouros e um estojo pensado para acompanhar todos os dias.</p>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><div className="min-w-0"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Curadoria SOLIS</p><h2 className="mt-2 truncate font-display text-3xl sm:text-4xl">Os mais desejados</h2></div><Link to="/loja" className="shrink-0 border-b border-foreground pb-1 text-xs font-semibold">Ver todos</Link></div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-6 lg:grid-cols-3">{products.slice(0,6).map((product) => <ProductCard key={product.slug} product={product} />)}</div>
        </section>

        <section className="mt-24 bg-foreground px-6 py-20 text-center text-background"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-background/60">Uma promessa simples</p><h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl sm:text-6xl">Experimente a diferença.<br/>Pague apenas quando receber.</h2><Button asChild variant="secondary" size="lg" className="mt-8"><Link to="/loja">Escolher a minha armação</Link></Button></section>
      </main>
      {offerOpen && <aside className="fixed bottom-4 left-4 z-40 grid max-w-[calc(100vw-2rem)] grid-cols-[auto_1fr_auto] items-center gap-3 border border-border bg-background p-3 shadow-xl sm:max-w-sm"><span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-foreground">✓</span><p className="text-xs leading-5"><strong className="block">Frete grátis à sua espera!</strong>Finalize a sua encomenda</p><Button variant="ghost" size="icon" onClick={() => setOfferOpen(false)} aria-label="Fechar oferta"><X /></Button></aside>}
    </StoreShell>
  );
}
