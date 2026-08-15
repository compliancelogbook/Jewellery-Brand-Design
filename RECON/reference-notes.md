# Reference Reconnaissance — Victoria Percival Homepage

**Reference URL:** https://victoriapercival.com/

**Inspection date:** 15 August 2026

**Scope:** Public homepage only. The supplied URL resolved to a single Shopify storefront homepage. Capture records are stored outside the deployable project directory at `/home/ubuntu/screenshots/`.

## Captured Desktop States

| View | Screenshot | Observed composition |
|---|---|---|
| Hero | `victoriapercival_2026-08-15_22-25-16_9810.webp` | Announcement ticker, transparent white overlay header, wide image hero, lower-left copy stack, compact dual CTAs. |
| First product rail | `victoriapercival_2026-08-15_22-25-26_8626.webp` | Four-across image led rail with minimal centred product details and arrow affordance. |
| Bestseller rail | `victoriapercival_2026-08-15_22-25-31_3208.webp` | Section title and one-line descriptor, large whitespace, four product cards, press-logo strip leading into dark band. |

## Observed Page Grammar

1. A narrow black delivery ticker sits at page top.
2. The navigation overlays the hero and contains left-aligned wordmark, central horizontal category links, then search, account and cart icons.
3. The full-width image hero uses a high-contrast text overlay and two rectangular, lightly bordered buttons.
4. Product rails are four-up at desktop, nearly edge-to-edge, with black/dark product stills and centred metadata below.
5. Information is compact: label, product name, material or benefit, price. No ratings or reviews will be reproduced in the Orielé implementation.
6. A light neutral canvas separates the product rails from editorial images and partner/press strips.
7. The scrolling experience is image-first, punctuated by editorial split panels and a high-contrast utility footer.

## Lower-Page Observations

| Area | Observed reference pattern | Orielé decision |
|---|---|---|
| Press strip | A narrow horizontal strip of external publication logos follows a product rail. | Replace with a brand-owned material statement strip, not third-party marks. |
| Guarantee band | A three-column black information band appears before an editorial split-image block. | Use original care, craft, and delivery messaging without unverified guarantees. |
| Editorial split | Two vertically cropped portrait panels introduce a more event-oriented collection. | Maintain a two-panel editorial composition using original generated photography and original copy. |
| Email capture popup | A modal interrupts the scroll with a promotional discount and customer-facing images. | Omit the reference popup; the Orielé implementation uses a persistent inline studio-letter form only. |

**Additional screenshot:** `victoriapercival_2026-08-15_22-26-06_9328.webp` captures the lower-page press strip, black utility band, two-up editorial imagery, and a third-party promotional overlay. The overlay is explicitly out of scope for reproduction.

## Representative Route Map

| Reference route | Screenshot | Reusable layout pattern for Orielé |
|---|---|---|
| `/` | `victoriapercival_2026-08-15_22-25-16_9810.webp` | Editorial hero, product rails, collection split, email capture, footer. |
| `/collections/new-apres-sea` | `victoriapercival_2026-08-15_22-26-31_3250.webp` | Image-led collection hero, breadcrumb, inline filter/sort controls, four-card product grid, FAQ and related-items continuation. |
| `/products/golden-tide-necklace` | `victoriapercival_2026-08-15_22-26-38_2144.webp` | Two-column desktop product page: asymmetric media mosaic on left, sticky detail/purchase pane on right, detail accordions and related items below. |
| `/pages/our-story` | `victoriapercival_2026-08-15_22-26-51_4451.webp` | Dark collage hero, long narrative introduction, material/ethics section, simple utility footer. |

## Implementation Boundary

The public source lookup returned no identifiable official, reuse-licensed repository. This will therefore be an original React implementation informed by the publicly observable layout and interaction patterns only. It will not copy source files, theme code, assets, copy, product images, visual marks, endorsements, or user-generated reviews.

## Implementation Validation

| Check | Result |
|---|---|
| Desktop route verification | Homepage, collection, product detail, and studio story routes rendered as intended at 1280px wide. |
| Mobile route verification | Homepage, collection, and product detail routes rendered correctly at 375px wide, with a compact header and two-column product grid/media layout. |
| Build verification | Type checking and production build completed successfully after the original implementation and visual refinements. |
| Originality verification | Brand name, copy, photography brief, generated logo mark, products, material claims, navigation labels, and editorial pages have been independently authored. |
| Intentional exclusions | No reference customer reviews, ratings, press logos, discount popup, shopping integrations, source code, product catalog data, or third-party brand marks are included. |

## Replacement Rules

Orielé will maintain the high-level layout, product-card proportions, responsive collapse behaviour, header hierarchy, cards-to-editorial rhythm, and lightweight rail controls. It will replace all reference identifiers, copy, imagery, products, logos, guarantee claims, factual commerce details, social proof, and brand storytelling with original equivalents.
