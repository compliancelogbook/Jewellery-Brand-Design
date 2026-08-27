export type PromoCode = { code: string; percentOff: number; label: string };

export const promoCodes: PromoCode[] = [
  { code: "WELCOME10", percentOff: 10, label: "10% off your first order" },
];

export function findPromoCode(input: string): PromoCode | null {
  const normalised = input.trim().toUpperCase();
  return promoCodes.find((promo) => promo.code === normalised) ?? null;
}
