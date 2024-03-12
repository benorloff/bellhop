/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'utfs.io',
            },
            {
                protocol: 'https',
                hostname: 'loremflickr.com',
            },
            {
                protocol: 'https',
                hostname: 'circleblackhelp.zendesk.com',
            }
        ]
    },
}

module.exports = nextConfig
