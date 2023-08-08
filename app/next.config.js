const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Your existing configuration options here */
};

module.exports = Object.assign({}, nextConfig, {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
});