import {
  PricingGridFilter,
  PricingGridFilters,
} from "../models/PricingGridFilter";
import dayjs from "dayjs";

const storageKey = "pricingGridFilters";
const activeFilterStorageKey = "activePricingGridFilters";

export function getPricingGridFilters(): Promise<PricingGridFilters | null> {
  const filters = localStorage.getItem(storageKey);
  if (filters === null) return Promise.resolve(null);

  return Promise.resolve(JSON.parse(filters) as PricingGridFilters);
}

export async function createPricingGridFilter(
  filterName: string,
  filter: PricingGridFilter
): Promise<void> {
  const filters = localStorage.getItem(storageKey);
  let newState: PricingGridFilters;
  if (filters === null) {
    newState = { [filterName]: filter };
  } else {
    const existingState = JSON.parse(filters) as PricingGridFilters;
    newState = { ...existingState, [filterName]: filter };
  }
  localStorage.setItem(storageKey, JSON.stringify(newState));
  await storeActiveFilter(filterName);
  return Promise.resolve();
}

export function updatePricingGridFilterLastUsed(
  filterName: string
): Promise<void> {
  const filters = localStorage.getItem(storageKey);
  let newState: PricingGridFilters;
  if (filters === null) {
    return Promise.reject("Filter not found");
  } else {
    const existingState = JSON.parse(filters) as PricingGridFilters;
    if (filterName in existingState) {
      const existingFilter = existingState[filterName];
      newState = {
        ...existingState,
        [filterName]: { ...existingFilter, lastUsed: dayjs().toISOString() },
      };
      localStorage.setItem(storageKey, JSON.stringify(newState));
      return Promise.resolve();
    } else {
      return Promise.reject("Filter not found");
    }
  }
}

export function deletePricingGridFilter(filterName: string): Promise<void> {
  const filters = localStorage.getItem(storageKey);
  if (filters === null) return Promise.resolve();

  const existingState = JSON.parse(filters) as PricingGridFilters;
  const newState = { ...existingState };
  delete newState[filterName];
  if (Object.keys(newState).length === 0) {
    localStorage.removeItem(storageKey);
    localStorage.removeItem(activeFilterStorageKey);
  } else {
    localStorage.setItem(storageKey, JSON.stringify(newState));
  }

  return Promise.resolve();
}

export function getActiveFilter(): Promise<string | null> {
  return Promise.resolve(localStorage.getItem(activeFilterStorageKey));
}

export function storeActiveFilter(filterName: string | null): Promise<void> {
  if (filterName === null) {
    localStorage.removeItem(activeFilterStorageKey);
    return Promise.resolve();
  }

  localStorage.setItem(activeFilterStorageKey, filterName);
  return Promise.resolve();
}
