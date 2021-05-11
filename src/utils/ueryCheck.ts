export const limitQery = (query: string) => {
  const nan = Number(query);
  if (!Number.isNaN(nan)) {
    return nan;
  }
  return;
};
