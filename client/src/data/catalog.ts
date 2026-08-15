/** Orielé visual system: Mediterranean Keepsake Modernism — original product content only. */
export type Piece = {
  slug: string;
  name: string;
  category?: "ring" | "necklace" | "earrings" | "bracelet";
  material: string;
  price: string;
  badge?: string;
  image: string;
  alternateImage: string;
};

export const pieces: Piece[] = [
  {
    slug: "aurora-disc-pendant",
    name: "Aurora Disc Pendant",
    material: "Gold vermeil · amber glass",
    price: "£118",
    badge: "New",
    image: "/manus-storage/oriele-product-aurora-disc_f884f487.jpg",
    alternateImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "pearl-orbit-drop",
    name: "Pearl Orbit Drops",
    material: "Gold vermeil · freshwater pearl",
    price: "£94",
    badge: "New",
    image: "/manus-storage/oriele-product-pearl-orbit_13710701.jpg",
    alternateImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "solis-ridge-ring",
    name: "Solis Ridge Ring",
    category: "ring",
    material: "Recycled silver · 18k plate",
    price: "£82",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "tide-thread-chain",
    name: "Tide Thread Chain",
    material: "Gold vermeil · hand-finished",
    price: "£136",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "lumen-pearl-collar",
    name: "Lumen Pearl Collar",
    material: "Freshwater pearl · silk cord",
    price: "£152",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "citrus-stud-set",
    name: "Citrus Stud Set",
    material: "Gold vermeil · citrine glass",
    price: "£68",
    badge: "Small batch",
    image: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "rivulet-cuff",
    name: "Rivulet Cuff",
    material: "Recycled silver · hand-formed",
    price: "£109",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "marea-chainlet",
    name: "Marea Chainlet",
    material: "Gold vermeil · adjustable",
    price: "£74",
    image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?auto=format&fit=crop&w=1100&q=85",
  },
];

export const findPiece = (slug: string) => pieces.find((piece) => piece.slug === slug) ?? pieces[0];
