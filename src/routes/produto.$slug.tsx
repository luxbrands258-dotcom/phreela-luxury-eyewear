import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, ChevronLeft, ShieldCheck, Star } from "lucide-react";
import clientAmina from "@/assets/client-amina.jpg";
import clientCelso from "@/assets/client-celso.jpg";
import clientVania from "@/assets/client-vania.jpg";
import { StoreShell } from "@/components/store-shell";
import { CheckoutDialog } from "@/components/checkout-dialog";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { formatPrice, products } from "@/lib/catalog";

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }) => { const product = products.find((p) => p.slug === params.slug); if (!product) throw notFound(); return product; },
  head: ({ loaderData }) => ({ meta: [
    { title: loaderData ? `${loaderData.name} — SOLIS` : "Produto indisponível — SOLIS" },
    { name: "description", content: loaderData ? `${loaderData.name}: armação premium com proteção UV400 e entrega em Moçambique.` : "Este produto não está disponível." },
    { property: "og:title", content: loaderData ? `${loaderData.name} — SOLIS` : "Produto indisponível — SOLIS" },
    { property: "og:description", content: "Armação premium com proteção UV400 e pagamento na entrega." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: ProductPage,
});

const testimonials = [
  { image: clientAmina, quote: "Qualidade incrível! A entrega em Maputo foi super rápida e paguei ao receber.", name: "Amina S. — Maputo" },
  { image: clientCelso, quote: "A armação é leve, elegante e assenta muito bem. O atendimento foi impecável.", name: "Celso M. — Matola" },
  { image: clientVania, quote: "Ainda mais bonitos ao vivo. Chegaram bem embalados e com um estojo lindo.", name: "Vânia C. — Beira" },
];

function ProductPage() {
  const product = Route.useLoaderData();
  const [variant, setVariant] = useState("Preto");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const gallery = useMemo(() => [product.image, ...products.filter((p)=>p.slug !== product.slug).slice(0,2).map((p)=>p.image)], [product]);
  const [mainImage, setMainImage] = useState(product.image);
  const whatsapp = `https://wa.me/258870470801?text=${encodeURIComponent(`Olá, gostaria de encomendar o modelo ${product.name} no valor de ${formatPrice(product.price)}. Variação: ${variant}.`)}`;
  return <StoreShell><main className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-12"><Link to="/loja" className="mb-7 inline-flex items-center gap-1 text-xs text-muted-foreground"><ChevronLeft className="h-4 w-4"/>Voltar à loja</Link><div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
    <div><div className="aspect-square overflow-hidden rounded-2xl bg-product"><img src={mainImage} alt={`Óculos ${product.name}`} width={1200} height={1200} className="h-full w-full object-cover"/></div><div className="mt-3 flex gap-3">{gallery.map((img,i)=><button type="button" key={img} onClick={()=>setMainImage(img)} className={`aspect-square w-20 overflow-hidden rounded-lg border-2 ${mainImage===img?"border-foreground":"border-transparent"}`} aria-label={`Ver imagem ${i+1}`}><img src={img} alt="" className="h-full w-full object-cover"/></button>)}</div></div>
    <div className="lg:sticky lg:top-28 lg:self-start"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">{product.tag || "Coleção SOLIS"}</p><h1 className="mt-3 font-display text-5xl sm:text-6xl">{product.name}</h1><p className="mt-3 text-lg font-semibold">{formatPrice(product.price)}</p><div className="mt-7 border-y border-border py-6"><p className="text-xs font-semibold uppercase tracking-[0.1em]">Cor — {variant}</p><div className="mt-3 flex gap-2">{["Preto","Castanho","Tartaruga"].map((v)=><Button key={v} type="button" variant={variant===v?"default":"outline"} onClick={()=>setVariant(v)} className="rounded-full">{v}</Button>)}</div></div><p className="mt-6 text-sm leading-7 text-muted-foreground">Armação Slim Chic Oval 90s | Proteção UV400 | Leveza e Luxo para o dia a dia. Inclui estojo e pano de limpeza.</p><ul className="mt-5 grid gap-2 text-xs"><li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4"/>Proteção UV400</li><li className="flex items-center gap-2"><Check className="h-4 w-4"/>Entrega grátis em Maputo e Matola</li></ul><div className="mt-7 grid gap-3"><Button size="lg" className="h-13 text-sm" onClick={()=>setCheckoutOpen(true)}>Encomende • Pague ao Receber</Button><Button asChild size="lg" variant="outline" className="h-13"><a href={whatsapp} target="_blank" rel="noreferrer">Encomendar pelo WhatsApp</a></Button><Button asChild variant="link" className="h-auto whitespace-normal py-2 text-xs"><a href="tel:+258870470801">Precisa de ajuda? Ligue agora, atendimento rápido: +258 87 047 0801</a></Button></div></div>
  </div>
  <section className="py-20 sm:py-28"><div className="text-center"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">Experiências reais</p><h2 className="mt-3 font-display text-4xl sm:text-5xl">O que dizem os nossos clientes</h2></div><div className="no-scrollbar -mx-4 mt-9 flex snap-x gap-4 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0">{testimonials.map((t)=><article key={t.name} className="min-w-[82%] snap-center rounded-2xl bg-soft p-3 sm:min-w-0"><img src={t.image} alt={`Cliente ${t.name} a usar óculos SOLIS`} loading="lazy" width={800} height={800} className="aspect-square w-full rounded-xl object-cover"/><div className="p-3"><div className="flex gap-0.5 text-accent" aria-label="5 estrelas">{Array.from({length:5}).map((_,i)=><Star key={i} className="h-3.5 w-3.5 fill-current"/>)}</div><p className="mt-4 text-sm leading-6">“{t.quote}”</p><p className="mt-4 text-xs font-semibold">{t.name}</p></div></article>)}</div></section>
  <section><div className="mb-8 flex items-end justify-between"><h2 className="font-display text-4xl">Também poderá gostar</h2><Link to="/loja" className="text-xs font-semibold">Ver todos</Link></div><div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">{products.filter((p)=>p.slug!==product.slug).slice(0,3).map((p)=><ProductCard key={p.slug} product={p}/>)}</div></section>
  <CheckoutDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} product={product} variant={variant}/></main></StoreShell>;
}