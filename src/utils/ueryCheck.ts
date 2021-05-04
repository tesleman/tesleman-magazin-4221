export const limitQery = (query) => {
  const nan = Number(query);
  if (!Number.isNaN(nan)) {
    return nan;
  }
  return;
};
