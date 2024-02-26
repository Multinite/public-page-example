/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "X-Frame-Options",
            value: "allow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
