import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const provinces = ["Maputo Cidade", "Maputo Província", "Gaza", "Inhambane", "Sofala", "Manica", "Tete", "Zambézia", "Nampula", "Cabo Delgado", "Niassa"] as const;

export const orderSchema = z.object({
  customer_name: z.string().trim().min(2, "Indique o seu nome completo").max(100),
  phone: z.string().trim().min(8, "Indique um contacto válido").max(24).regex(/^[+\d\s()-]+$/, "Contacto inválido"),
  email: z.union([z.literal(""), z.string().trim().email("E-mail inválido").max(255)]),
  province: z.enum(provinces, { required_error: "Escolha uma província" }),
  city: z.string().trim().min(2, "Indique a cidade, distrito ou bairro").max(120),
  address_reference: z.string().trim().min(3, "Adicione um ponto de referência").max(300),
  preferred_delivery_time: z.enum(["Manhã (08h - 12h)", "Tarde (13h - 17h)"], { required_error: "Escolha um horário" }),
  product_name: z.string().trim().min(2).max(120),
  product_variant: z.string().trim().min(2).max(40),
  subtotal: z.number().positive().max(1000000),
});

export type OrderInput = z.infer<typeof orderSchema>;

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator((data) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    const url = process.env['SUPABASE_URL'];
    const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
    if (!url || !key) throw new Error("O serviço de pedidos está temporariamente indisponível.");
    const client = createClient<Database>(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: order, error } = await client.from("orders").insert({
      ...data,
      email: data.email || null,
      shipping_cost: 0,
      total_amount: data.subtotal,
      status: "Pendente",
    }).select("id").single();
    if (error) throw new Error("Não foi possível concluir o pedido. Tente novamente.");
    return { id: order.id };
  });