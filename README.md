# Phreela Luxury Eyewear

Crie uma loja virtual e-commerce completa, ultra-limpa, elegante e totalmente funcional para uma marca premium de óculos de sol e armações de luxo.

### 1. IDIOMA E MOEDA

- Idioma total da loja: Português.

- Moeda oficial: Metical de Moçambique (exibir formatado como "3.500,00 MT" ou "MZN").

### 2. DESIGN SYSTEM & ESTÉTICA (Estilo Phreela Eyewear)

- Estilo visual: Minimalista, moderno, sofisticado e limpo.

- Paleta de cores:

  - Fundo principal: Branco puro (#FFFFFF) e Cinza ultra-suave (#F8F9FA / #F3F3F3).

  - Texto e destaques: Preto/Grafite (#111111) para alto contraste.

  - Accent/Botões: Preto elegante ou Roxo/Azul suave (#5B50E5).

- Tipografia: Serifada elegante para títulos e sans-serif limpa para botões, preços e corpo de texto.

- Imagens dos produtos: Cartões de produto com cantos suavemente arredondados (rounded-2xl), fundo neutro de estúdio em tom cinza claro e fotografias em luz natural.

### 3. ESTRUTURA DO HEADER E NAVEGAÇÃO

- Announcement Bar (Barra Superior): Cor preta/escura no topo com o texto: "NOVO: Coleção Premium de Verão →".

- Header Principal (Centralizado e Responsivo):

  - Esquerda: Links ("Loja", "Coleção Signature", "Sobre Nós").

  - Centro: Logótipo elegante e centralizado ("PHREELA" ou nome da marca).

  - Direita: Ícone de pesquisa (lupa) e Ícone de Carrinho de Compras com contador flutuante.

  - Mobile: Menu Hambúrguer à esquerda, Logo centralizado e Carrinho à direita.

### 4. HOMEPAGE & LAYOUT DE CONTEÚDO

- Hero Banner: Imagem editorial de destaque com caixa flutuante centralizada contendo a frase: "Óculos de Sol Premium. Sem a margem do luxo." e botões "Ver Coleção Signature" e "Mais Vendidos".

- Seção "Sobre a Marca": Texto centralizado explicativo sobre a qualidade das armações.

- Grade de Produtos (Product Grid): 3 colunas no Desktop e 2 colunas no Mobile.

- Widget Flutuante de Oferta: No canto inferior esquerdo com a mensagem "Frete grátis à sua espera! Finalize a sua encomenda" e botão para fechar (X).

### 5. PÁGINA DE DETALHES DO PRODUTO (PDP)

Ao clicar num produto, exibir:

- Galeria de imagens (Imagem principal + miniaturas interativas).

- Título do produto, preço em Meticais (MT) e pílulas de variação de cores (Preto, Castanho, Tartaruga).

- Descrição curta: "Armação Slim Chic Oval 90s | Proteção UV400 | Leveza e Luxo para o dia a dia. Inclui estojo e pano de limpeza".

#### 🔘 BLOCO DE BOTÕES DE AÇÃO NA PÁGINA DO PRODUTO:

1. BOTÃO PRINCIPAL (Destaque Superior):

   - Texto do botão: `Encomende • Pague ao Receber`

   - Ação: Abre um Pop-up/Modal interativo de checkout rápido "Pagamento na entrega".

2. SEGUNDO BOTÃO (WhatsApp):

   - Texto do botão: `Encomendar pelo WhatsApp`

   - Ação: Abre link direto para WhatsApp (`https://wa.me/258XXXXXXXXX?text=Olá,%20gostaria%20de%20encomendar%20o%20modelo%20[NOME_DO_PRODUTO]%20no%20valor%20de%20[PREÇO]%20MT`).

3. TERCEIRO BOTÃO (Atendimento Telefónico):

   - Texto do botão: `Precisa de ajuda? Ligue agora, atendimento rápido: +258 8X XXX XXXX`

   - Ação: Link de chamada telefónica `tel:+2588XXXXXXXX`.

---

### 6. POP-UP / MODAL: "PAGAMENTO NA ENTREGA" (Fluxo Principal de Checkout)

Ao clicar no botão principal `Encomende • Pague ao Receber`, abrir um Modal centralizado com a seguinte estrutura e estilo limpo:

#### Cabeçalho do Pop-up:

- Título: **Pagamento na entrega**

- Subtítulo/Aviso em destaque suave: "🚚 Entrega grátis para Maputo e Matola • Entregas para todo o país".

#### Resumo do Pedido (Caixa Superior no Pop-up):

- Foto em miniatura do produto selecionado + Nome do modelo e variação escolhida.

- **Subtotal:** [Valor do Produto] MT

- **Custo de Frete:** [Valor do Frete / "Grátis para Maputo e Matola"] <span title="Frete grátis para Maputo/Matola. Para outras províncias, a taxa é calculada após confirmação da localização.">ℹ️ (?)</span> *(Ícone de interrogação com tooltip explicativo)*

- **Valor Total a Pagar:** **[Soma do Subtotal + Frete] MT** *(Em negrito e destaque)*

#### Formulário do Pedido (Campos do Cliente):

Crie um formulário bem estruturado com os seguintes campos:

1. **Nome Completo** *(Obrigatório)*

2. **Contacto Telefónico (WhatsApp)** *(Obrigatório)*

3. **E-mail** *(Opcional)*

4. **Província** *(Obrigatório - Menu Dropdown com as 11 províncias de Moçambique)*:

   - Maputo Cidade

   - Maputo Província

   - Gaza

   - Inhambane

   - Sofala

   - Manica

   - Tete

   - Zambézia

   - Nampula

   - Cabo Delgado

   - Niassa

5. **Cidade / Distrito / Bairro** *(Obrigatório)*

6. **Ponto de Referência de Entrega** *(Obrigatório - ex: "Próximo à Escola X, Paragem do Machimbombo")*

7. **Hora Preferencial de Entrega** *(Obrigatório - ex: "Manhã (08h - 12h)" ou "Tarde (13h - 17h)")*

#### Botão de Submissão do Pop-up:

- Texto do botão principal: **Concluir o pedido — [VALOR_TOTAL] MT**

- Ao clicar em "Concluir o pedido":

  - Validar os campos obrigatórios.

  - Exibir uma tela/mensagem de confirmação de sucesso no modal: "Pedido realizado com sucesso! Entraremos em contacto em breve para confirmar a entrega."

  - Limpar os dados do formulário e fechar o modal.

---

### 7. PREPARAÇÃO DA BASE DE DADOS (Arquitetura de Dados / Supabase Ready)

Estruture os estados (states) do React/Lovable e o manipulador do formulário (submit handle) para que os dados do pedido sejam organizados num objeto JSON pronto para integração com o banco de dados (Supabase/PostgreSQL) com a seguinte tabela `orders`:

- `id` (UUID)

- `created_at` (Timestamp)

- `customer_name` (Text)

- `phone` (Text)

- `email` (Text, nullable)

- `province` (Text)

- `city` (Text)

- `address_reference` (Text)

- `preferred_delivery_time` (Text)

- `product_name` (Text)

- `product_variant` (Text)

- `subtotal` (Numeric)

- `shipping_cost` (Numeric)

- `total_amount` (Numeric)

- `status` (Text, default: 'Pendente')

---

### 8. RESPONSIVIDADE E MOBILE VIEW

- Garanta que no Mobile a visualização fique alinhada em 2 colunas de produtos por linha.

- O pop-up "Pagamento na entrega" deve ser totalmente responsivo, ajustando-se à tela do telemóvel como uma folha inferior (bottom sheet) ou modal rolável para fácil preenchimento. ### 5.1 SECÇÃO DE TESTEMUNHOS E PROVA SOCIAL (Na Página do Produto)

Inserir logo abaixo da descrição do produto e acima dos produtos relacionados:

- Título da Secção: "O que dizem os nossos clientes" (Estilo minimalista, texto centralizado).

- Formato: Carrossel horizontal de cards limpos (com navegação por deslize no mobile).

- Design do Card de Testemunho:

  - Fundo neutro cinza-claro (#F8F9FA) com cantos arredondados (rounded-2xl) e sem sombra ostensiva.

  - Foto real/amadora do cliente a usar o produto (proporção 1:1 quadrada).

  - Avaliação em 5 Estrelas (ícones discretos).

  - Comentário curto do cliente (ex: "Qualidade incrível! A entrega em Maputo foi super rápida e paguei ao receber.").

  - Nome do cliente + Cidade (ex: "Amina S. — Maputo").

- Micro-prova Social no Pop-up de Checkout:

  - No cabeçalho do Modal "Pagamento na entrega", inclua um crachá/badge discreto: 

    "⭐️ 4.9/5 — Escolhido por +200 clientes em Moçambique".

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f8c733f1-f763-4081-a2d6-06c477eb6f33).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
