export type PricingGridFilters = {
  [filterName in string]: PricingGridFilter;
};

export type PricingGridFilter = { [p: string]: any; lastUsed: string };
