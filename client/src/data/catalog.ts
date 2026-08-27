/** Golden Hour visual system: Mediterranean Keepsake Modernism — original product content only. */
export type FinishOption = "gold" | "silver" | "rose-gold";

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
  tertiaryImage?: string;
  description?: string;
  /** Only set this when the piece is genuinely made in more than one finish — otherwise it's derived from `material` below. */
  finishes?: FinishOption[];
  /** ISO date the piece was added — drives the "New In" section, which drops a piece automatically after NEW_IN_WINDOW_DAYS. */
  addedAt?: string;
};

export const NEW_IN_WINDOW_DAYS = 30;

export function isNewIn(piece: Piece): boolean {
  if (!piece.addedAt) return false;
  const daysSinceAdded = (Date.now() - new Date(piece.addedAt).getTime()) / 86_400_000;
  return daysSinceAdded >= 0 && daysSinceAdded <= NEW_IN_WINDOW_DAYS;
}

export const finishLabels: Record<FinishOption, string> = { gold: "Gold", silver: "Silver", "rose-gold": "Rose gold" };

/** Falls back to reading the piece's own material description, so we never claim a finish that isn't real. */
export function getFinishes(piece: Piece): FinishOption[] {
  if (piece.finishes) return piece.finishes;
  const material = piece.material.toLowerCase();
  if (material.includes("rose gold")) return ["rose-gold"];
  if (material.includes("silver")) return ["silver"];
  return ["gold"];
}

export type EditSlug = "new-in" | "personal" | "sola" | "bridal" | "something-blue" | "mother-of-the-bride" | "say-i-do" | "honeymoon" | "bridal-accessories" | "chic-happens" | "old-money-minimalist" | "christmas";
export type CategorySlug = "rings" | "earrings" | "necklaces" | "bracelets" | "bridal-accessories";
export type CategoryCollection = { slug: CategorySlug; type: NonNullable<Piece["category"]>; title: string; eyebrow: string; subtitle: string; image: string; featureImage: string };

export type CollectionEdit = {
  slug: EditSlug;
  title: string;
  eyebrow: string;
  subtitle?: string;
  image: string;
  children?: EditSlug[];
};

export const collectionEdits: CollectionEdit[] = [
  { slug: "new-in", title: "New In", eyebrow: "Fresh to the studio", subtitle: "The latest pieces, just added.", image: "https://res.cloudinary.com/dnp0sgoad/image/upload/v1787830007/Burgundy-Red_Velvet_bow-Gold-Tone-Studs-Model.png" },
  { slug: "personal", title: "PERSONAL", eyebrow: "Let's get", subtitle: "Seven initials to choose from — a small, permanent way to keep someone close.", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1600&q=90" },
  { slug: "sola", title: "Golden Hour", eyebrow: "The core collection", subtitle: "A study in sun, stone and the calm after a long lunch.", image: "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?auto=format&fit=crop&w=1900&q=90" },
  { slug: "bridal", title: "The Bridal Edit", eyebrow: "For every kind of yes", subtitle: "Pieces for the promises, the photographs and the people who make the day feel like yours.", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=90", children: ["something-blue", "mother-of-the-bride", "say-i-do", "honeymoon", "bridal-accessories"] },
  { slug: "something-blue", title: "Something Blue", eyebrow: "The Bridal Edit / I", subtitle: "A cool glint, a blue note and a little luck to keep close.", image: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&w=1600&q=90" },
  { slug: "mother-of-the-bride", title: "Mother of the Bride", eyebrow: "The Bridal Edit / II", subtitle: "Mother-of-pearl, soft lustre and the kind of pieces that hold a room quietly.", image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1600&q=90" },
  { slug: "say-i-do", title: "Say I Do", eyebrow: "The Bridal Edit / III", subtitle: "For the hand you hold, the vow you make and the rings that stay close.", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1600&q=90" },
  { slug: "honeymoon", title: "The Honeymoon & Back", eyebrow: "Love you to", subtitle: "For the airport gate, the villa balcony and every ordinary day once the suitcases are unpacked.", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1600&q=90" },
  { slug: "bridal-accessories", title: "Bridal Accessories", eyebrow: "The Bridal Edit / IV", subtitle: "Hair pieces, luminous drops and the finishing details that turn a look into a memory.", image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1600&q=90" },
  { slug: "chic-happens", title: "Chic Happens", eyebrow: "An after-hours edit", subtitle: "A little more shine for late tables, a good shirt and an unexpected invitation.", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=90" },
  { slug: "old-money-minimalist", title: "Old Money Minimalist", eyebrow: "The wardrobe edit", subtitle: "Clean lines, softened metals and the pieces you wear often enough to forget they are there.", image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=1600&q=90" },
  { slug: "christmas", title: "The Christmas Edit", eyebrow: "Gifts for the golden hour", subtitle: "For the stockings, the secret santas, and the one thing you actually wanted.", image: "https://res.cloudinary.com/dnp0sgoad/image/upload/v1787767314/reindeer-crystal-red-nose-studs-staged-master-concept-v1.png" },
];

export const categoryCollections: CategoryCollection[] = [
  { slug: "rings", type: "ring", title: "Rings", eyebrow: "Shop by category", subtitle: "Sculpted bands and small declarations, designed to become part of your hands’ story.", image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1600&q=90", featureImage: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=90" },
  { slug: "earrings", type: "earrings", title: "Earrings", eyebrow: "Shop by category", subtitle: "A quiet movement of pearl, gold and light, made to catch the room without asking for it.", image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=1600&q=90", featureImage: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1600&q=90" },
  { slug: "necklaces", type: "necklace", title: "Necklaces", eyebrow: "Shop by category", subtitle: "Fine chains and luminous pendants for the open collar, the everyday shirt and the late table.", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1100&q=85", featureImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=90" },
  { slug: "bracelets", type: "bracelet", title: "Bracelets", eyebrow: "Shop by category", subtitle: "Easy pieces to stack, layer and live in, each with a softly considered finish.", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1600&q=90", featureImage: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=1000&q=90" },
  { slug: "bridal-accessories", type: "accessory", title: "Bridal Accessories", eyebrow: "Shop by category", subtitle: "Pearl hair pieces and luminous finishing touches for promises, photographs and every moment in between.", image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1600&q=90", featureImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1100&q=85" },
];

export const pieces: Piece[] = [

  {
    slug: "burgundy-bow-stud-earrings",
    name: "Burgundy Velvet Bow Stud Earrings",
    category: "earrings",
    edits: ["christmas"],
    addedAt: "2026-08-27",
    material: "Gold-tone brass · burgundy velvet",
    price: "£14",
    badge: "New",
    description: "A softly tailored velvet bow in a rich burgundy, finished with gold-tone hardware — a festive stud with just enough polish for the party season.",
    image: "https://res.cloudinary.com/dnp0sgoad/image/upload/v1787830007/Burgundy-Red_Velvet_bow-Gold-Tone-Studs-Model.png",
    alternateImage: "https://res.cloudinary.com/dnp0sgoad/image/upload/v1787830027/burgundy-red-velvet_bow-gold-tone-stud-earrings.png",
  },
  {
    slug: "reindeer-red-nose-studs",
    name: "Gold Crystal Reindeer Stud Earrings",
    category: "earrings",
    edits: ["christmas"],
    addedAt: "2026-08-27",
    material: "Gold-plated brass · red crystal",
    price: "£14",
    badge: "Limited edition",
    description: "Add festive sparkle to your look with these gold-tone crystal reindeer stud earrings. Featuring pavé crystal detailing, sculpted antlers and a signature red crystal nose, secured with a secure butterfly back, for a playful Christmas look. Perfect for festive parties, seasonal outfits, Secret Santa gifts and Christmas stocking fillers.",
    image: "https://res.cloudinary.com/dnp0sgoad/image/upload/v1787767144/reindeer-crystal-red-nose-studs-on-model-ear-macro-concept-v1.png",
    alternateImage: "https://res.cloudinary.com/dnp0sgoad/image/upload/v1787767299/reindeer-crystal-red-nose-studs-head-on-master-concept-v2.png",
    tertiaryImage: "https://res.cloudinary.com/dnp0sgoad/image/upload/v1787767314/reindeer-crystal-red-nose-studs-staged-master-concept-v1.png",
  },
  {
    slug: "vesper-pearl-drops",
    name: "Vesper Pearl Drops",
    category: "earrings",
    edits: ["bridal", "mother-of-the-bride"],
    addedAt: "2026-08-27",
    material: "18k gold vermeil · pear-cut cubic zirconia · South Sea pearl",
    price: "£168",
    badge: "Signature piece",
    description: "A pear-cut solitaire meets a lustrous South Sea pearl in a quiet study of contrast — one bright edge, one soft weight, for the walk down the aisle and every ordinary morning after.",
    image: "https://res.cloudinary.com/dnp0sgoad/image/upload/v1787388121/pear-pearl-studs-house-model-02-approved-v1_pcbl74.png",
    alternateImage: "https://res.cloudinary.com/dnp0sgoad/image/upload/v1787767442/Gold-Tone_Pear-Shaped_Stone_Pearl-Effect_Drop_Stud_Earrings.png",
  },


















  // --- The following are real pieces you have in stock (qty 1 each), added from your inventory database.
  // --- Placeholder photos below (borrowed from elsewhere in the catalog) — swap for your real photos when ready.
  {
    slug: "marquise-crystal-tennis-bracelet",
    name: "Marquise Crystal Gold Tennis Bracelet",
    category: "bracelet",
    edits: ["bridal"],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy · marquise-cut cubic zirconia",
    price: "£18",
    badge: "New",
    description: "Gold-tone tennis bracelet lined with sparkling marquise-cut cubic zirconia stones — a classic, versatile sparkle piece.",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "mother-of-pearl-buckle-bangle",
    name: "Mother-of-Pearl Inlay Buckle Bangle",
    category: "bracelet",
    edits: [],
    addedAt: "2026-08-27",
    material: "Gold-tone metal · mother-of-pearl inlay",
    price: "£16",
    badge: "New",
    description: "Hinged gold-tone bangle with a bold H-shaped buckle clasp and mother-of-pearl inlay panels — a structured, polished piece that layers well or wears alone.",
    image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "kite-cut-crystal-tennis-bracelet",
    name: "Kite-Cut Crystal Tennis Bracelet",
    category: "bracelet",
    edits: [],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy · clear crystal",
    price: "£18",
    badge: "New",
    description: "Tennis bracelet set edge-to-edge with kite-cut clear crystals in a gold-tone setting — catches the light from every angle for a bold, everyday-glam look.",
    image: "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "graduated-crystal-drop-bracelet",
    name: "Graduated Crystal Drop Chain Bracelet",
    category: "bracelet",
    edits: [],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy · clear crystal",
    price: "£15",
    badge: "New",
    description: "Delicate gold-tone chain bracelet strung with graduated pear- and round-cut crystal drops — a dainty, lariat-style piece that adds movement without overwhelming the wrist.",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "round-cut-crystal-tennis-bracelet",
    name: "Round-Cut Crystal Tennis Bracelet",
    category: "bracelet",
    edits: [],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy · clear crystal",
    price: "£16",
    badge: "New",
    description: "Fine tennis bracelet lined with round-cut clear crystals in a slim gold-tone setting — a classic sparkle piece that layers easily with other bracelets.",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "matte-gold-clover-bracelet",
    name: "Matte Gold Clover Charm Bracelet",
    category: "bracelet",
    edits: [],
    addedAt: "2026-08-27",
    material: "Matte gold-tone alloy",
    price: "£12",
    badge: "New",
    description: "Gold-tone chain bracelet set with four-leaf clover charms in a soft matte finish — an understated, everyday layering piece with a timeless motif.",
    image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "crystal-clover-charm-bracelet",
    name: "Crystal-Accent Clover Charm Bracelet",
    category: "bracelet",
    edits: [],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy · clear crystal",
    price: "£13",
    badge: "New",
    description: "Gold-tone chain bracelet set with four-leaf clover charms accented with clear crystal detailing — pairs well with the matte clover bracelet for a stacked look.",
    image: "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "mama-script-bracelet",
    name: "Mama Script Bracelet",
    category: "bracelet",
    edits: [],
    addedAt: "2026-08-27",
    material: "Gold-tone chain",
    price: "£12",
    badge: "New",
    description: "Fine gold-tone chain bracelet featuring a cursive 'Mama' script charm — a sentimental, lightweight everyday piece and a natural gift for Mother's Day or new mums.",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "black-velvet-bow-earrings",
    name: "Black Velvet Bow Drop Earrings",
    category: "earrings",
    edits: [],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy stud · velvet bow",
    price: "£14",
    badge: "New",
    description: "Gold ball stud earrings with a soft black velvet bow drop — an elegant, versatile finish for everyday and evening wear.",
    image: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "pearl-heart-velvet-bow-earrings",
    name: "Pearl Heart Red Velvet Bow Drop Earrings",
    category: "earrings",
    edits: ["christmas"],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy · faux pearl · velvet bow",
    price: "£15",
    badge: "New",
    description: "Gold-tone stud earrings with a pearl heart top and a plush red velvet bow drop — a romantic, festive pairing perfect for the holiday season.",
    image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "pearl-crystal-interlocking-studs",
    name: "Pearl & Crystal Interlocking Stud Earrings",
    category: "earrings",
    edits: [],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy · faux pearl · cubic zirconia pavé",
    price: "£13",
    badge: "New",
    description: "Gold-tone stud earrings featuring a pearl centre framed by sparkling crystal pavé in an interlocking ribbon design — an elegant everyday accent.",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "gold-starfish-studs",
    name: "Gold Starfish Stud Earrings",
    category: "earrings",
    edits: [],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy",
    price: "£10",
    badge: "New",
    description: "Textured gold-tone starfish stud earrings with a coastal finish — lightweight, with secure butterfly backs, for easy everyday warm-weather styling.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "crystal-cluster-drop-earrings",
    name: "Crystal Cluster Drop Earrings",
    category: "earrings",
    edits: [],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy · clear crystal",
    price: "£17",
    badge: "New",
    description: "Statement drop earrings featuring tiered marquise and pear-cut clear crystals set in a gold-tone frame — a glamorous evening piece with plenty of sparkle and movement.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "pave-huggie-pearl-charm-hoops",
    name: "Pave Huggie Hoops with Pearl Charm Drop",
    category: "earrings",
    edits: [],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy · clear pavé crystal · faux pearl",
    price: "£14",
    badge: "New",
    description: "Petite huggie hoop earrings edged in pavé crystal, finished with a detachable faux-pearl and gold-tone letter charm drop — layers well with other hoops or wears alone.",
    image: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "pave-chain-border-circle-studs",
    name: "Pave Chain-Border Circle Stud Earrings",
    category: "earrings",
    edits: [],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy · clear crystal",
    price: "£12",
    badge: "New",
    description: "Round stud earrings framed by a gold-tone chain-link border, set with an interlocking pavé crystal ring motif at the centre — a polished, structured stud with everyday wearability.",
    image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "pave-bow-pearl-studs",
    name: "Pave Bow and Pearl Stud Earrings",
    category: "earrings",
    edits: [],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy · clear pavé crystal · faux pearl",
    price: "£12",
    badge: "New",
    description: "Stud earrings topped with a pavé crystal bow and finished with a round faux-pearl drop — a dainty, feminine everyday stud with a touch of sparkle.",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "marquise-crystal-pearl-drops",
    name: "Marquise Crystal and Pearl Drop Earrings",
    category: "earrings",
    edits: [],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy · clear marquise crystal · faux pearl",
    price: "£14",
    badge: "New",
    description: "Stud earrings featuring a cluster of marquise-cut crystals set above a round faux-pearl drop — a refined, classic pair that suits both daytime and occasion wear.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "trio-crystal-flower-huggies",
    name: "Trio Crystal Flower Huggie Hoops",
    category: "earrings",
    edits: [],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy · clear crystal",
    price: "£13",
    badge: "New",
    description: "Small gold-tone huggie hoops finished with a trio crystal flower charm drop — a subtle, everyday hoop that adds a hint of sparkle without being overstated.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "black-enamel-heart-huggies",
    name: "Black Enamel Heart Huggie Hoops",
    category: "earrings",
    edits: [],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy · black enamel",
    price: "£12",
    badge: "New",
    description: "Gold-tone huggie hoops finished with a black enamel heart charm drop — a small, everyday hoop with a bold pop of colour.",
    image: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "cloud-plane-stud-set",
    name: "Cloud and Plane Stud Earring Set (2 Pairs)",
    category: "earrings",
    edits: [],
    addedAt: "2026-08-27",
    material: "Gold-tone metal · white enamel",
    price: "£14",
    badge: "New",
    description: "Set of two stud earring pairs on one card — brushed gold-tone plane studs and matte white cloud studs. A playful travel-themed set that can be worn together or mixed and matched.",
    image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "red-enamel-bow-studs",
    name: "Red Enamel Bow Stud Earrings",
    category: "earrings",
    edits: [],
    addedAt: "2026-08-27",
    material: "Enamel · gold-tone alloy",
    price: "£10",
    badge: "New",
    description: "Small stud earrings finished with a glossy red enamel bow — a neat, colourful everyday stud with a playful finish.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "initial-necklace-j",
    name: "Gold Bubble Balloon Letter Necklace — Initial J",
    category: "necklace",
    edits: ["personal"],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy · synthetic zirconia inlay",
    price: "£15",
    badge: "New",
    description: "Bubble balloon-style letter 'J' pendant with a hollow-out design and sparkling synthetic zirconia inlay, on a gold link chain.",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "initial-necklace-g",
    name: "Gold Bubble Balloon Letter Necklace — Initial G",
    category: "necklace",
    edits: ["personal"],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy · synthetic zirconia inlay",
    price: "£15",
    badge: "New",
    description: "Bubble balloon-style letter 'G' pendant with a hollow-out design and sparkling synthetic zirconia inlay, on a gold link chain.",
    image: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "initial-necklace-o",
    name: "Gold Bubble Balloon Letter Necklace — Initial O",
    category: "necklace",
    edits: ["personal"],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy · synthetic zirconia inlay",
    price: "£15",
    badge: "New",
    description: "Bubble balloon-style letter 'O' pendant with a hollow-out design and sparkling synthetic zirconia inlay, on a gold link chain.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "initial-necklace-d",
    name: "Gold Bubble Balloon Letter Necklace — Initial D",
    category: "necklace",
    edits: ["personal"],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy · synthetic zirconia inlay",
    price: "£15",
    badge: "New",
    description: "Bubble balloon-style letter 'D' pendant with a hollow-out design and sparkling synthetic zirconia inlay, on a gold link chain.",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "initial-necklace-e",
    name: "Gold Bubble Balloon Letter Necklace — Initial E",
    category: "necklace",
    edits: ["personal"],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy · synthetic zirconia inlay",
    price: "£15",
    badge: "New",
    description: "Bubble balloon-style letter 'E' pendant with a hollow-out design and sparkling synthetic zirconia inlay, on a gold link chain.",
    image: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "initial-necklace-n",
    name: "Gold Bubble Balloon Letter Necklace — Initial N",
    category: "necklace",
    edits: ["personal"],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy · synthetic zirconia inlay",
    price: "£15",
    badge: "New",
    description: "Bubble balloon-style letter 'N' pendant with a hollow-out design and sparkling synthetic zirconia inlay, on a gold link chain.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "initial-necklace-h",
    name: "Gold Bubble Balloon Letter Necklace — Initial H",
    category: "necklace",
    edits: ["personal"],
    addedAt: "2026-08-27",
    material: "Gold-tone alloy · synthetic zirconia inlay",
    price: "£15",
    badge: "New",
    description: "Bubble balloon-style letter 'H' pendant with a hollow-out design and sparkling synthetic zirconia inlay, on a gold link chain.",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "mama-script-necklace",
    name: "Mama Script Necklace",
    category: "necklace",
    edits: [],
    addedAt: "2026-08-27",
    material: "Gold-tone chain",
    price: "£14",
    badge: "New",
    description: "Fine gold-tone chain necklace featuring a cursive 'Mama' script pendant, matching the Mama Script Bracelet — a sentimental, lightweight everyday piece and a natural gift for Mother's Day or new mums.",
    image: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1100&q=85",
  },
  {
    slug: "bezel-crystal-station-ring",
    name: "Bezel-Set Crystal Station Ring",
    category: "ring",
    edits: [],
    addedAt: "2026-08-27",
    material: "Gold-tone metal · clear crystal",
    price: "£18",
    badge: "New",
    description: "Polished gold-tone band ring set with round bezel-set crystal stations spaced evenly around the band — a substantial, everyday-stackable ring with a clean, structured look. US size 7 / UK N½.",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1100&q=85",
    alternateImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1100&q=85",
  },
];

export const findPiece = (slug: string) => pieces.find((piece) => piece.slug === slug) ?? pieces[0];
export const getEdit = (slug: string) => collectionEdits.find((edit) => edit.slug === slug) ?? collectionEdits[0];
export const piecesForEdit = (slug: EditSlug) => {
  if (slug === "bridal") return pieces.filter((piece) => piece.edits.includes("bridal") || piece.edits.some((edit) => ["something-blue", "mother-of-the-bride", "say-i-do", "honeymoon", "bridal-accessories"].includes(edit)));
  if (slug === "new-in") return pieces.filter(isNewIn);
  return pieces.filter((piece) => piece.edits.includes(slug));
};
export const getCategory = (slug: string) => categoryCollections.find((category) => category.slug === slug) ?? categoryCollections[0];
export const piecesForCategory = (slug: CategorySlug) => pieces.filter((piece) => piece.category === getCategory(slug).type);
