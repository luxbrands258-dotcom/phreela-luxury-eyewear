import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function StoreShell({ children, cartCount = 0 }: { children: ReactNode; cartCount?: number }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const links = [
    { to: "/loja" as const, label: "Loja" },
    { to: "/colecao-signature" as const, label: "Coleção Signature" },
    { to: "/sobre" as const, label: "Sobre Nós" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Link to="/colecao-signature" className="block bg-foreground px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-background">
        Novo: Coleção Premium de Verão <span aria-hidden="true">→</span>
      </Link>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto grid h-18 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-8 lg:px-12">
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
            {links.map((item) => <Link key={item.to} to={item.to} className="text-xs font-medium uppercase tracking-[0.12em] hover:text-muted-foreground">{item.label}</Link>)}
          </nav>
          <Button variant="ghost" size="icon" className="justify-self-start lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Abrir menu">
            {mobileOpen ? <X /> : <Menu />}
          </Button>
          <Link to="/" className="font-display text-2xl font-semibold tracking-[0.22em] sm:text-3xl">SOLIS</Link>
          <div className="flex items-center justify-self-end gap-1">
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex" onClick={() => setSearchOpen(!searchOpen)} aria-label="Pesquisar"><Search /></Button>
            <Button variant="ghost" size="icon" aria-label={`Carrinho com ${cartCount} artigos`}><ShoppingBag /><span className="absolute ml-5 -mt-6 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[9px] font-bold text-accent-foreground">{cartCount}</span></Button>
          </div>
        </div>
        {mobileOpen && <nav className="border-t border-border bg-background px-5 py-5 lg:hidden">{links.map((item) => <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className="block border-b border-border py-4 font-display text-xl">{item.label}</Link>)}</nav>}
        {searchOpen && <div className="border-t border-border bg-background p-4"><div className="mx-auto flex max-w-xl items-center gap-3 border-b border-foreground pb-2"><Search className="h-4 w-4"/><input autoFocus className="w-full bg-transparent text-sm outline-none" placeholder="Pesquisar armações..." aria-label="Pesquisar armações" /></div></div>}
      </header>
      {children}
      <footer className="mt-24 border-t border-border bg-soft px-5 py-14">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-3">
          <div><p className="font-display text-3xl tracking-[0.16em]">SOLIS</p><p className="mt-3 max-w-xs text-sm text-muted-foreground">Óculos premium desenhados para acompanhar a luz de Moçambique.</p></div>
          <div><p className="text-xs font-semibold uppercase tracking-[0.14em]">Explorar</p><div className="mt-4 grid gap-2 text-sm text-muted-foreground"><Link to="/loja">Todos os modelos</Link><Link to="/colecao-signature">Coleção Signature</Link><Link to="/sobre">A nossa história</Link></div></div>
          <div><p className="text-xs font-semibold uppercase tracking-[0.14em]">Atendimento</p><a href="tel:+258870470801" className="mt-4 block text-sm text-muted-foreground">+258 87 047 0801</a><p className="mt-2 text-sm text-muted-foreground">Pagamento seguro na entrega.</p></div>
        </div>
      </footer>
    </div>
  );
}