import { IJsonModel, Model } from "flexlayout-react";

export const homeLayoutKey = "homeLayout";
export const pricingLayoutKey = "pricingLayout";
export type LayoutKey = typeof homeLayoutKey | typeof pricingLayoutKey;

export function getLastSavedHomeLayout(): Promise<Model | null> {
  const tabLayout = localStorage.getItem(homeLayoutKey);
  if (!!tabLayout) {
    const jsonModel: IJsonModel = JSON.parse(tabLayout);
    const layoutModel = Model.fromJson(jsonModel);
    return Promise.resolve(layoutModel);
  }

  return Promise.resolve(null);
}

export function saveHomeLayout(model: Model | string): Promise<void> {
  localStorage.setItem(
    homeLayoutKey,
    typeof model === "string" ? model : model.toString()
  );
  return Promise.resolve();
}

export function getLastSavedPricingLayout(
  tabId: string
): Promise<Model | null> {
  const tabLayout = localStorage.getItem(pricingLayoutKey);
  if (!!tabLayout) {
    const layoutMap: { [key in string]: string } = JSON.parse(tabLayout);
    const subLayoutForTab = layoutMap[tabId];
    if (!!subLayoutForTab) {
      const jsonModel: IJsonModel = JSON.parse(subLayoutForTab);
      const layoutModel = Model.fromJson(jsonModel);
      return Promise.resolve(layoutModel);
    }
  }

  return Promise.resolve(null);
}

export async function savePricingLayout(
  tabId: string,
  model: Model
): Promise<void> {
  const existing = localStorage.getItem(pricingLayoutKey);
  if (existing === null) {
    const entry = { [tabId]: model.toString() };
    localStorage.setItem(pricingLayoutKey, JSON.stringify(entry));
  } else {
    const existingEntry: { [key in string]: string } = JSON.parse(existing);
    const entry = {
      ...existingEntry,
      [tabId]: model.toString(),
    };
    localStorage.setItem(pricingLayoutKey, JSON.stringify(entry));
  }
  return Promise.resolve();
}
