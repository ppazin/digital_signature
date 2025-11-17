module.exports = {
  async rewrites() {
    return [
      {
        source: "/data/:path*",
        destination: "/api/static/:path*",
      },
    ];
  },
};
