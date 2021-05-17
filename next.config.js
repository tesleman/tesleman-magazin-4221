module.exports = {
  pageExtensions: ['page.tsx', 'page.ts'],
  env: {
    DOMAIN: process.env.DOMAIN,
    MONGO_URI: process.env.MONGO_URL,
    SECRET: procces.env.SECRET,
  },
};
