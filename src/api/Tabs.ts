import { mapToTab, Tab } from "../models/Tab";

const storageKey = "savedTabs";

enum ErrorMessages {
  TabNameExists = "Tab with the same name already exists",
  TabNotExists = "Tab does not exist",
}

type TabStorage = {
  [key in string]: Array<string>;
};

export function getTabs(): Promise<Array<Tab>> {
  const savedTabsStr = localStorage.getItem(storageKey);

  if (savedTabsStr === null) {
    return Promise.resolve([]);
  }

  const savedTabs: TabStorage = JSON.parse(savedTabsStr);

  const tabs = Object.keys(savedTabs).map(
    (tabName) =>
      ({
        id: tabName,
        name: tabName,
        portfolios: Object.values(savedTabs[tabName]),
      } as Tab)
  );

  return Promise.resolve(tabs.map((t) => mapToTab(t)));
}

export function getTab(tabId: string): Promise<Tab | null> {
  const savedTabsStr = localStorage.getItem(storageKey);

  if (savedTabsStr === null) {
    return Promise.resolve(null);
  }

  const savedTabs: TabStorage = JSON.parse(savedTabsStr);

  const tabExists = savedTabs.hasOwnProperty(tabId);

  if (!tabExists) return Promise.resolve(null);

  const portfolios = savedTabs[tabId];
  const tab: Tab = { id: tabId, name: tabId, portfolios };
  return Promise.resolve(mapToTab(tab));
}

export function createTab(tab: Tab): Promise<void> {
  const savedTabsStr = localStorage.getItem(storageKey);

  if (savedTabsStr === null) {
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        [tab.name]: tab.portfolios,
      })
    );
    return Promise.resolve();
  }

  const savedTabs: TabStorage = JSON.parse(savedTabsStr);
  const existingTabs = new Set(Object.keys(savedTabs));
  if (existingTabs.has(tab.name)) {
    return Promise.reject(ErrorMessages.TabNameExists);
  }

  const newTabs = {
    ...savedTabs,
    [tab.name]: tab.portfolios,
  };

  localStorage.setItem(storageKey, JSON.stringify(newTabs));

  return Promise.resolve();
}

export function updateTab(tabId: string, tab: Tab): Promise<void> {
  const savedTabsStr = localStorage.getItem(storageKey);

  if (savedTabsStr === null) {
    return Promise.resolve();
  }

  let savedTabs: TabStorage = JSON.parse(savedTabsStr);
  const existingTabs = new Set(Object.keys(savedTabs));
  if (!existingTabs.has(tabId)) {
    return Promise.reject(ErrorMessages.TabNotExists);
  }

  // remove old entry
  savedTabs = Object.entries(savedTabs).reduce((agg, [key, value]) => {
    if (key === tabId) return agg;
    return {
      ...agg,
      [key]: value,
    };
  }, {} as TabStorage);

  const newTabs = {
    ...savedTabs,
    [tab.name]: tab.portfolios,
  };

  localStorage.setItem(storageKey, JSON.stringify(newTabs));

  return Promise.resolve();
}

export function deleteTab(tabId: string): Promise<void> {
  const savedTabsStr = localStorage.getItem(storageKey);

  if (savedTabsStr === null) {
    return Promise.resolve();
  }

  const savedTabs: TabStorage = JSON.parse(savedTabsStr);
  const existingTabs = new Set(Object.keys(savedTabs));
  if (!existingTabs.has(tabId)) {
    return Promise.reject(ErrorMessages.TabNotExists);
  }

  const updatedTabs = Object.keys(savedTabs).reduce((agg, cur) => {
    if (cur === tabId) return agg;

    return {
      ...agg,
      ...{ [cur]: savedTabs[cur] },
    };
  }, {} as TabStorage);

  localStorage.setItem(storageKey, JSON.stringify(updatedTabs));

  return Promise.resolve();
}
