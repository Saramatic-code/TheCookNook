// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { dev }) {
        if (dev) {
            config.devtool = 'source-map';
        }
        return config;
    },
};

export default nextConfig;
