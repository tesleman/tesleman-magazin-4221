module.exports = {
  pageExtensions: ['page.tsx', 'page.ts'],
  env: {
    MONGO_URI: process.env.MONGO_URL,
    SECRET: process.env.SECRET,
  },
};
