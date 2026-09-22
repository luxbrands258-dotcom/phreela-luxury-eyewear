CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  customer_name TEXT NOT NULL CHECK (char_length(customer_name) BETWEEN 2 AND 100),
  phone TEXT NOT NULL CHECK (char_length(phone) BETWEEN 8 AND 24),
  email TEXT CHECK (email IS NULL OR char_length(email) <= 255),
  province TEXT NOT NULL CHECK (province IN ('Maputo Cidade','Maputo Província','Gaza','Inhambane','Sofala','Manica','Tete','Zambézia','Nampula','Cabo Delgado','Niassa')),
  city TEXT NOT NULL CHECK (char_length(city) BETWEEN 2 AND 120),
  address_reference TEXT NOT NULL CHECK (char_length(address_reference) BETWEEN 3 AND 300),
  preferred_delivery_time TEXT NOT NULL CHECK (preferred_delivery_time IN ('Manhã (08h - 12h)','Tarde (13h - 17h)')),
  product_name TEXT NOT NULL CHECK (char_length(product_name) BETWEEN 2 AND 120),
  product_variant TEXT NOT NULL CHECK (char_length(product_variant) BETWEEN 2 AND 40),
  subtotal NUMERIC(12,2) NOT NULL CHECK (subtotal >= 0),
  shipping_cost NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (shipping_cost >= 0),
  total_amount NUMERIC(12,2) NOT NULL CHECK (total_amount = subtotal + shipping_cost),
  status TEXT NOT NULL DEFAULT 'Pendente' CHECK (status IN ('Pendente','Confirmado','Em trânsito','Entregue','Cancelado'))
);

GRANT INSERT ON public.orders TO anon;
GRANT INSERT ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer cliente pode criar um pedido"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'Pendente'
  AND shipping_cost = 0
  AND total_amount = subtotal
);