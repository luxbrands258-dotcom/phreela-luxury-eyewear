import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/solis-hero.jpg";
import { StoreShell } from "@/components/store-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/sobre")({ head: () => ({ meta: [
  { title: "Sobre a SOLIS" }, { name: "description", content: "Conheça a visão da SOLIS para tornar óculos premium mais próximos e acessíveis em Moçambique." },
  { property: "og:title", content: "Sobre a SOLIS" }, { property: "og:description", content: "Design premium, escolhido para a luz de Moçambique." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
] }), component: AboutPage });

function AboutPage() { return <StoreShell><main><section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-24"><div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">A nossa história</p><h1 className="mt-4 font-display text-5xl leading-none sm:text-7xl">Feitos para viver sob o sol.</h1><p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground">A SOLIS nasceu em Moçambique com uma ideia clara: tornar o design premium próximo, honesto e fácil de usar. Selecionamos armações expressivas, leves e resistentes, sem custos que não acrescentam valor.</p><p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">Cada par inclui lentes com proteção UV400, estojo e pano de limpeza. Entregamos em todo o país e, em Maputo e Matola, a entrega é gratuita.</p><Button asChild size="lg" className="mt-8"><Link to="/loja">Conhecer a coleção</Link></Button></div><img src={heroImage} alt="A estética SOLIS em Maputo" width={1600} height={1000} className="aspect-[4/5] w-full object-cover"/></section></main></StoreShell>; }