export const limitQery = (query: string) => {
  const nan = Number(query);
  if (!Number.isNaN(nan)) {
    return nan;
  }
  return;
};

export const qeryPrceHendler = (router) => {
  if (!router.query.price) return;
  return { price: router.query.price };
};

export const qeryTextHendler = (router) => {
  if (!router.query.q) return;
  return { q: router.query.q };
};
