export type DbTab = {
  id: string;
  name: string;
  portfolios: Array<string>;
};

export type Tab = {
  id: string;
  name: string;
  portfolios: Array<string>;
};

export function mapToTab(tab: DbTab): Tab {
  const { id, name, portfolios } = tab;

  return {
    id,
    name,
    portfolios,
  };
}
