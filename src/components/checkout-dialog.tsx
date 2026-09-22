import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Check, CircleHelp, LoaderCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createOrder, orderSchema } from "@/lib/orders.functions";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/catalog";

const provinces = ["Maputo Cidade", "Maputo Província", "Gaza", "Inhambane", "Sofala", "Manica", "Tete", "Zambézia", "Nampula", "Cabo Delgado", "Niassa"];
const fieldClass = "h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:border-foreground focus:ring-1 focus:ring-foreground";
const initialForm = { customer_name: "", phone: "", email: "", province: "", city: "", address_reference: "", preferred_delivery_time: "" };

export function CheckoutDialog({ open, onOpenChange, product, variant }: { open: boolean; onOpenChange: (open: boolean) => void; product: Product; variant: string }) {
  const submitOrder = useServerFn(createOrder);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const update = (key: string, value: string) => setForm((current) => ({ ...current, [key]: value }));

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setServerError("");
    const payload = { ...form, product_name: product.name, product_variant: variant, subtotal: product.price };
    const parsed = orderSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Record<string,string> = {};
      parsed.error.issues.forEach((issue) => { next[String(issue.path[0])] = issue.message; });
      setErrors(next); return;
    }
    setErrors({}); setPending(true);
    try {
      await submitOrder({ data: parsed.data });
      setForm(initialForm); setSuccess(true);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Não foi possível concluir o pedido.");
    } finally { setPending(false); }
  }

  function close(value: boolean) { onOpenChange(value); if (!value) window.setTimeout(() => setSuccess(false), 250); }
  return <Dialog open={open} onOpenChange={close}><DialogContent className="bottom-0 left-0 top-auto max-h-[94svh] w-full max-w-none translate-x-0 translate-y-0 overflow-y-auto rounded-t-2xl border-b-0 p-0 sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-w-2xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg sm:border-b">
    {success ? <div className="grid min-h-[420px] place-items-center p-8 text-center"><div><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success text-success-foreground"><Check className="h-7 w-7"/></span><h2 className="mt-6 font-display text-4xl">Pedido realizado com sucesso!</h2><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">Entraremos em contacto em breve para confirmar a entrega.</p><Button className="mt-7" onClick={() => close(false)}>Continuar a explorar</Button></div></div> : <>
      <DialogHeader className="border-b border-border px-5 py-6 sm:px-7"><div className="flex items-center gap-2 text-[11px] font-semibold text-accent"><Star className="h-3.5 w-3.5 fill-current"/> 4.9/5 — Escolhido por +200 clientes em Moçambique</div><DialogTitle className="mt-3 font-display text-3xl font-semibold">Pagamento na entrega</DialogTitle><DialogDescription className="rounded-md bg-soft px-3 py-2 text-xs text-foreground">🚚 Entrega grátis para Maputo e Matola • Entregas para todo o país</DialogDescription></DialogHeader>
      <form onSubmit={handleSubmit} className="p-5 sm:p-7">
        <div className="grid grid-cols-[72px_minmax(0,1fr)] gap-4 rounded-lg bg-soft p-3"><img src={product.image} alt="" className="aspect-square w-[72px] rounded-md object-cover"/><div className="min-w-0"><p className="truncate font-display text-xl">{product.name}</p><p className="text-xs text-muted-foreground">{variant}</p><div className="mt-2 grid grid-cols-[1fr_auto] gap-y-1 text-xs"><span>Subtotal</span><strong>{formatPrice(product.price)}</strong><span className="flex items-center gap-1">Custo de frete <span title="Frete grátis para Maputo/Matola. Para outras províncias, a taxa é calculada após confirmação da localização."><CircleHelp className="h-3 w-3"/></span></span><strong>Grátis*</strong><span className="mt-2 border-t border-border pt-2 font-semibold">Valor total a pagar</span><strong className="mt-2 border-t border-border pt-2">{formatPrice(product.price)}</strong></div></div></div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Nome Completo *" error={errors.customer_name}><input className={fieldClass} value={form.customer_name} onChange={(e)=>update("customer_name",e.target.value)} maxLength={100}/></Field>
          <Field label="Contacto Telefónico (WhatsApp) *" error={errors.phone}><input className={fieldClass} type="tel" value={form.phone} onChange={(e)=>update("phone",e.target.value)} maxLength={24}/></Field>
          <Field label="E-mail (Opcional)" error={errors.email}><input className={fieldClass} type="email" value={form.email} onChange={(e)=>update("email",e.target.value)} maxLength={255}/></Field>
          <Field label="Província *" error={errors.province}><select className={fieldClass} value={form.province} onChange={(e)=>update("province",e.target.value)}><option value="">Selecione</option>{provinces.map((p)=><option key={p}>{p}</option>)}</select></Field>
          <Field label="Cidade / Distrito / Bairro *" error={errors.city}><input className={fieldClass} value={form.city} onChange={(e)=>update("city",e.target.value)} maxLength={120}/></Field>
          <Field label="Hora Preferencial *" error={errors.preferred_delivery_time}><select className={fieldClass} value={form.preferred_delivery_time} onChange={(e)=>update("preferred_delivery_time",e.target.value)}><option value="">Selecione</option><option>Manhã (08h - 12h)</option><option>Tarde (13h - 17h)</option></select></Field>
          <Field label="Ponto de Referência de Entrega *" error={errors.address_reference} wide><textarea className="min-h-20 w-full resize-none rounded-md border border-input bg-background p-3 text-sm outline-none focus:border-foreground" placeholder="Ex: Próximo à Escola X, Paragem do Machimbombo" value={form.address_reference} onChange={(e)=>update("address_reference",e.target.value)} maxLength={300}/></Field>
        </div>
        {serverError && <p className="mt-4 text-sm text-destructive">{serverError}</p>}
        <Button type="submit" size="lg" className="mt-6 h-12 w-full" disabled={pending}>{pending ? <><LoaderCircle className="animate-spin"/>A concluir...</> : `Concluir o pedido — ${formatPrice(product.price)}`}</Button>
        <p className="mt-3 text-center text-[10px] text-muted-foreground">Ao concluir, autoriza a SOLIS a contactá-lo para confirmar esta entrega.</p>
      </form>
    </>}
  </DialogContent></Dialog>;
}

function Field({ label, error, wide, children }: { label: string; error?: string; wide?: boolean; children: React.ReactNode }) { return <label className={wide ? "sm:col-span-2" : ""}><span className="mb-1.5 block text-xs font-semibold">{label}</span>{children}{error && <span className="mt-1 block text-[11px] text-destructive">{error}</span>}</label>; }