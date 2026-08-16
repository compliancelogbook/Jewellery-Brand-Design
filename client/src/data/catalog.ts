/** Golden Hour visual system: Mediterranean Keepsake Modernism — original product content only. */
export type Piece = {
  slug: string;
  name: string;
  category?: "ring" | "necklace" | "earrings" | "bracelet" | "accessory";
  edits: EditSlug[];
  material: string;
  price: string;
  badge?: string;
  image: string;
  alternateImage: string;
};

export type EditSlug = "sola" | "bridal" | "something-blue" | "mother-of-the-bride" | "say-i-do" | "bridal-accessories" | "chic-happens" | "old-money-minimalist";

export type CollectionEdit = {
  slug: EditSlug;
  title: string;
  eyebrow: string;
  subtitle: string;
  image: string;
  children?: EditSlug[];
};

export const collectionEdits: CollectionEdit[] = [
  { slug: "sola", title: "Sola / Solstice", eyebrow: "Golden Hour / 2026", subtitle: "A study in sun, stone and the calm after a long lunch.", image: "/manus-storage/oriele-hero-mediterranean-tide_8af5f0e5.jpg" },
  { slug: "bridal", title: "The Bridal Edit", eyebrow: "For every kind of yes", subtitle: "Pieces for the promises, the photographs and the people who make the day feel like yours.", image: "/manus-storage/oriele-editorial-sunroom_794fa073.jpg", children: ["something-blue", "mother-of-the-bride", "say-i-do", "bridal-accessories"] },
  { slug: "something-blue", title: "Something Blue", eyebrow: "The Bridal Edit / I", subtitle: "A cool glint, a blue note and a little luck to keep close.", image: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&w=1600&q=90" },
  { slug: "mother-of-the-bride", title: "Mother of the Bride", eyebrow: "The Bridal Edit / II", subtitle: "Mother-of-pearl, soft lustre and the kind of pieces that hold a room quietly.", image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1600&q=90" },
  { slug: "say-i-do", title: "Say I Do", eyebrow: "The Bridal Edit / III", subtitle: "For the hand you hold, the vow you make and the rings that stay close.", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1600&q=90" },
  { slug: "bridal-accessories", title: "Bridal Accessories", eyebrow: "The Bridal Edit / IV", subtitle: "Hair pieces, luminous drops and the finishing details that turn a look into a memory.", image: "/manus-storage/golden-hour-bridal-accessories-hero_fd3a30d3.jpg" },
  { slug: "chic-happens", title: "Chic Happens", eyebrow: "An after-hours edit", subtitle: "A little more shine for late tables, a good shirt and an unexpected invitation.", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=90" },
  { slug: "old-money-minimalist", title: "Old Money Minimalist", eyebrow: "The wardrobe edit", subtitle: "Clean lines, softened metals and the pieces you wear often enough to forget they are there.", image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=1600&q=90" },
];

export const pieces: Piece[] = [
  {
    slug: "aurora-disc-pendant",
    name: "Aurora Disc Pendant",
    edits: ["sola", "chic-happens"],
    material: "Gold vermeil · amber glass",
    price: "£118",
    badge: "New",
    image: "/manus-storage/oriele-product-aurora-disc_f884f487.jpg",
    alternateImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "pearl-orbit-drop",
    name: "Pearl Orbit Drops",
    edits: ["sola", "bridal", "mother-of-the-bride"],
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
    edits: ["sola", "say-i-do", "old-money-minimalist"],
    material: "Recycled silver · 18k plate",
    price: "£82",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "tide-thread-chain",
    name: "Tide Thread Chain",
    edits: ["sola", "chic-happens"],
    material: "Gold vermeil · hand-finished",
    price: "£136",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "lumen-pearl-collar",
    name: "Lumen Pearl Collar",
    edits: ["bridal", "mother-of-the-bride"],
    material: "Freshwater pearl · silk cord",
    price: "£152",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "citrus-stud-set",
    name: "Citrus Stud Set",
    edits: ["chic-happens"],
    material: "Gold vermeil · citrine glass",
    price: "£68",
    badge: "Small batch",
    image: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "rivulet-cuff",
    name: "Rivulet Cuff",
    edits: ["chic-happens", "old-money-minimalist"],
    material: "Recycled silver · hand-formed",
    price: "£109",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "marea-chainlet",
    name: "Marea Chainlet",
    edits: ["sola", "old-money-minimalist"],
    material: "Gold vermeil · adjustable",
    price: "£74",
    image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "cerulean-vow-drop",
    name: "Cerulean Vow Drops",
    category: "earrings",
    edits: ["bridal", "something-blue"],
    material: "Blue topaz · gold vermeil",
    price: "£126",
    badge: "Bridal",
    image: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "maris-pearl-pendant",
    name: "Maris Pearl Pendant",
    category: "necklace",
    edits: ["bridal", "mother-of-the-bride"],
    material: "Mother-of-pearl · 18k gold plate",
    price: "£148",
    badge: "Mother-of-pearl",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "ivory-arc-studs",
    name: "Ivory Arc Studs",
    category: "earrings",
    edits: ["bridal", "mother-of-the-bride"],
    material: "Mother-of-pearl · sterling silver",
    price: "£96",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "promise-pave-ring",
    name: "Promise Pave Ring",
    category: "ring",
    edits: ["bridal", "say-i-do"],
    material: "Recycled silver · cubic zirconia",
    price: "£118",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "heirloom-signature-ring",
    name: "Heirloom Signet Ring",
    category: "ring",
    edits: ["old-money-minimalist", "say-i-do"],
    material: "Recycled silver · hand-finished",
    price: "£132",
    badge: "Studio piece",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "midnight-gala-hoops",
    name: "Midnight Gala Hoops",
    category: "earrings",
    edits: ["chic-happens"],
    material: "Gold vermeil · black enamel",
    price: "£112",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "meridian-link-chain",
    name: "Meridian Link Chain",
    category: "necklace",
    edits: ["chic-happens", "old-money-minimalist"],
    material: "Gold vermeil · hand-finished",
    price: "£164",
    image: "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "pearl-comet-hair-pin",
    name: "Pearl Comet Hair Pin",
    category: "accessory",
    edits: ["bridal", "bridal-accessories"],
    material: "Freshwater pearl · gold-plated brass",
    price: "£68",
    badge: "Bridal accessory",
    image: "/manus-storage/golden-hour-pearl-hair-pin_b52e5475.jpg",
    alternateImage: "/manus-storage/golden-hour-bridal-accessories-hero_fd3a30d3.jpg",
  },
  {
    slug: "marlowe-halo-headband",
    name: "Marlowe Halo Headband",
    category: "accessory",
    edits: ["bridal", "bridal-accessories"],
    material: "Satin · mother-of-pearl · crystal",
    price: "£142",
    badge: "Limited run",
    image: "/manus-storage/golden-hour-crystal-halo-headband_e08e685d.jpg",
    alternateImage: "/manus-storage/golden-hour-bridal-accessories-hero_fd3a30d3.jpg",
  },
  {
    slug: "luna-drop-earrings",
    name: "Luna Drop Earrings",
    category: "earrings",
    edits: ["bridal", "bridal-accessories"],
    material: "Freshwater pearl · gold vermeil",
    price: "£124",
    image: "/manus-storage/golden-hour-bridal-earring-closeup_19c54fe5.jpg",
    alternateImage: "/manus-storage/golden-hour-evening-bridal-model_1eaa752e.jpg",
  },
  {
    slug: "nocturne-pearl-drops",
    name: "Nocturne Pearl Drops",
    category: "earrings",
    edits: ["bridal", "bridal-accessories", "chic-happens"],
    material: "Cultured pearl · 18k gold plate",
    price: "£136",
    image: "/manus-storage/golden-hour-evening-bridal-model_1eaa752e.jpg",
    alternateImage: "/manus-storage/golden-hour-bridal-earring-closeup_19c54fe5.jpg",
  },
];

export const findPiece = (slug: string) => pieces.find((piece) => piece.slug === slug) ?? pieces[0];
export const getEdit = (slug: string) => collectionEdits.find((edit) => edit.slug === slug) ?? collectionEdits[0];
export const piecesForEdit = (slug: EditSlug) => slug === "bridal" ? pieces.filter((piece) => piece.edits.includes("bridal") || piece.edits.some((edit) => ["something-blue", "mother-of-the-bride", "say-i-do", "bridal-accessories"].includes(edit))) : pieces.filter((piece) => piece.edits.includes(slug));
