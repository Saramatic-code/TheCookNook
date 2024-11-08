// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { dev }) {
        if (dev) {
            config.devtool = 'source-map';
        }
        return config;
    },
    env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    },
};

console.log('Loaded API URL from next.config.mjs:', process.env.NEXT_PUBLIC_API_BASE_URL);

export default nextConfig;
