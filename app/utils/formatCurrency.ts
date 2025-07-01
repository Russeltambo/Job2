export function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-CM", {
      style: "currency",
      currency: "CFA",
      maximumFractionDigits: 0,
    }).format(amount);
  }