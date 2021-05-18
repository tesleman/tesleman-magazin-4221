export const limitQery = (query: string) => {
  const nan = Number(query);
  if (!Number.isNaN(nan)) {
    return nan;
  }
  return;
};

export const qerySorteHendler = (router) => {
  if (!router.query.price && !router.query.data) return;
  if (router.query.price) return { price: router.query.price, data: '' };
  if (router.query.data) return { data: router.query.data, price: '' };
};

export const qeryTextHendler = (router) => {
  if (!router.query.q) return;
  return { q: router.query.q };
};
