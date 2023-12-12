import { WatchItem } from "../models/WatchItem";

const storageKey = "watchItems";

export function getWatchItems(): Promise<Array<WatchItem>> {
  const watchItemsStr = localStorage.getItem(storageKey);

  if (watchItemsStr === null) {
    return Promise.resolve([]);
  }

  return Promise.resolve(JSON.parse(watchItemsStr));
}

export function addWatchItem(watchItem: WatchItem): Promise<void> {
  const watchItemsStr = localStorage.getItem(storageKey);

  if (watchItemsStr === null) {
    localStorage.setItem(storageKey, JSON.stringify([watchItem]));
    return Promise.resolve();
  }

  const savedWatchItems: Array<WatchItem> = JSON.parse(watchItemsStr);

  const itemAlreadyExists =
    savedWatchItems.findIndex(
      (w) =>
        w.bbgId59 === watchItem.bbgId59 && w.traderName === watchItem.traderName
    ) > -1;

  if (itemAlreadyExists) {
    return Promise.reject(`Item already being watched`);
  }

  localStorage.setItem(
    storageKey,
    JSON.stringify([...savedWatchItems, watchItem])
  );

  return Promise.resolve();
}

export function deleteWatchItem(watchItem: WatchItem): Promise<void> {
  const watchItemsStr = localStorage.getItem(storageKey);

  if (watchItemsStr === null) {
    return Promise.resolve();
  }

  const savedWatchItems = JSON.parse(watchItemsStr) as Array<WatchItem>;
  const newWatchItems = savedWatchItems.filter(
    (item) =>
      item.bbgId59 !== watchItem.bbgId59 ||
      item.traderName !== watchItem.traderName
  );

  localStorage.setItem(storageKey, JSON.stringify(newWatchItems));

  return Promise.resolve();
}
