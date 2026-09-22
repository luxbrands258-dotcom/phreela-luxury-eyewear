import noirImage from "@/assets/solis-noir.jpg";
import tortoiseImage from "@/assets/solis-tartaruga.jpg";
import brownImage from "@/assets/solis-castanho.jpg";

export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  tag?: string;
};

export const products: Product[] = [
  { slug: "luna-noir", name: "Luna Noir", subtitle: "Oval • Preto", price: 3500, image: noirImage, tag: "Mais vendido" },
  { slug: "amara-tortoise", name: "Amara Tortoise", subtitle: "Cat-eye • Tartaruga", price: 4200, image: tortoiseImage, tag: "Signature" },
  { slug: "sena-castanho", name: "Sena Castanho", subtitle: "Retangular • Castanho", price: 3900, image: brownImage, tag: "Novo" },
  { slug: "nala-oval", name: "Nala Oval", subtitle: "Oval • Tartaruga", price: 3800, image: tortoiseImage },
  { slug: "maia-noir", name: "Maia Noir", subtitle: "Slim • Preto", price: 3600, image: noirImage },
  { slug: "zuri-gold", name: "Zuri Gold", subtitle: "Retangular • Castanho", price: 4500, image: brownImage, tag: "Edição limitada" },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("pt-MZ", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) + " MT";