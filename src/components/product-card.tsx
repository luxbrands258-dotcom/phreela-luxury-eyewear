import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to="/produto/$slug" params={{ slug: product.slug }} className="group min-w-0">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-product">
        {product.tag && <span className="absolute left-3 top-3 z-10 rounded-full bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]">{product.tag}</span>}
        <img src={product.image} alt={`Óculos ${product.name}`} loading="lazy" width={1200} height={1200} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]" />
        <span className="absolute bottom-3 right-3 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-foreground text-background opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight className="h-4 w-4" /></span>
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 pt-3">
        <div className="min-w-0"><h3 className="truncate font-display text-lg sm:text-xl">{product.name}</h3><p className="text-xs text-muted-foreground">{product.subtitle}</p></div>
        <p className="shrink-0 text-sm font-semibold">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}