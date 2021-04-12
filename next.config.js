module.exports = {
  pageExtensions: ['page.tsx', 'page.ts'],
  env: {
    domein: 'localhost:3000',
    MONGO_URI: process.env.MONGO_URL,
  },
};
