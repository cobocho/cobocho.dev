const ITEM_PER_PAGE = 10

export const slicePage = <T>(items: T[], page: number): T[] => {
  return items.slice((page - 1) * ITEM_PER_PAGE, ITEM_PER_PAGE * page)
}

export const sortByDate = <T extends { date: string }>(items: T[]): T[] => {
  return items.sort((item1, item2) => (item1.date > item2.date ? -1 : 1))
}
