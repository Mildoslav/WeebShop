import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    // reactStrictMode: true,
    // swcMinify: true,
    publicRuntimeConfig: {
        API_URL: process.env.API_URL || 'http://89.24.77.56:4000'
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'utfs.io',
                port: '',
                pathname: '/f/*',
                search: '',
            },
            {
                protocol: 'https',
                hostname: '2ucczhzrfg.ufs.sh',
                port: '',
                pathname: '/f/*',
                search: '',
            },

        ],
    },
};


export default nextConfig;