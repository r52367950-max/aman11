const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const SHOP_FREE_SHIPPING_THRESHOLD = 100;
export const SHOP_STANDARD_SHIPPING_FEE = 15;
export const SHOP_TAX_RATE = 0.08;

export function parsePriceString(price: string): number {
  return Number.parseInt(price.replace(/[^0-9]/g, ''), 10) || 0;
}

export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) {
    return 0;
  }

  const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  if (diff <= 0) {
    return 0;
  }

  return Math.ceil(diff / MS_PER_DAY);
}

export function calculateBookingTotal(roomRate: number, nights: number): number {
  if (roomRate <= 0 || nights <= 0) {
    return 0;
  }

  return roomRate * nights;
}

export function calculateShopPricing(subtotal: number, shippingOverride?: number) {
  const defaultShipping = subtotal > SHOP_FREE_SHIPPING_THRESHOLD ? 0 : SHOP_STANDARD_SHIPPING_FEE;
  const shipping = shippingOverride ?? defaultShipping;
  const tax = Number(((subtotal + shipping) * SHOP_TAX_RATE).toFixed(2));
  const total = Number((subtotal + shipping + tax).toFixed(2));

  return {
    shipping,
    tax,
    total,
  };
}
