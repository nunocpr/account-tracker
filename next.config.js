/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    reactStrictMode: true,
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
}

module.exports = nextConfig
