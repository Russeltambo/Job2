interface jobListingDurationPricingProps {
    days: number;
    price: number;
    description: string;
}

export const jobListingDurationPricing: jobListingDurationPricingProps[] = [
    {
      days: 30,
      price: 49500,
      description: "Standard listing",
    },
    {
      days: 60,
      price: 89500,
      description: "Extended visibility",
    },
    {
      days: 90,
      price: 124500,
      description: "Maximum exposure",
    },
  ];
  