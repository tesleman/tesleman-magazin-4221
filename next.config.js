module.exports = {
  pageExtensions: ['page.tsx', 'page.ts'],
  env: {
    domein: 'http://localhost:3000',
    MONGO_URI: process.env.MONGO_URL,
  },
};
